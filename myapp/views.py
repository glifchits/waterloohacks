# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
import Image
from PIL.ExifTags import TAGS, GPSTAGS
import json
from myapp.models import Document
import time
import datetime
from myapp.forms import DocumentForm
from urllib2 import Request, urlopen, URLError
import requests
import billboard
from django.views.decorators.csrf import csrf_exempt
import os

@csrf_exempt
def setMood(request):
    postData = json.loads(request.body)
    docId = postData.get('id', None)
    mood = postData.get('mood', None)
    caption = postData.get('caption', None)

    if docId is None:
        return HttpResponse(json.dumps({'status': 'error: invalid id'}), content_type="application/json")

    doc = Document.objects.get(id=docId)
    if mood:
        doc.mood = mood
    if caption:
        doc.caption = caption
    doc.save(update_fields=["mood", "caption"])
    return HttpResponse(json.dumps({'status': 'ok'}), content_type="application/json")


@csrf_exempt
def fileUpload(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            docId = createPicsule(request)
          #  newdoc.save()
            for (dir, _, files) in os.walk("myproject/media/documents"):
                for f in files:
                    path = os.path.join(dir, f)
                    print path
            # Redirect to the document list after POST
            return HttpResponse(json.dumps({'id': docId}), content_type="application/json")
    else:
        form = DocumentForm() # A empty, unbound form
    # Render list page with the documents and the form
    return render_to_response(
            'myapp/fileUpload.html',
        {'form': form},
        context_instance=RequestContext(request)
    )


def createPicsule(request):
    docfile = request.FILES['docfile']
    newDoc = Document(docfile=docfile)
    newDoc.save()
    newDoc = Document.objects.get(id=newDoc.id)
    ret = {}
    try:
        imageObj = Image.open('myproject' + newDoc.docfile.url)
        info = imageObj._getexif()
        if info is not None:
            for tag, value in info.items():
                decoded = TAGS.get(tag, tag)
                if decoded == "GPSInfo":
                    gps_data = {}
                    for t in value:
                        sub_decoded = GPSTAGS.get(t, t)
                        gps_data[sub_decoded] = value[t]
                    lat,long = get_lat_lon(gps_data)
                    ret["Latitude"] = lat;
                    ret["Longitude"] = long;
                else:
                    ret[decoded] = value
    except:
        print "error occured while tryin to grab image exif"

    #get top songs
    date = ret.get("DateTime")
    chart = None
    if date is not None:
        dateObj = datetime.datetime.strptime(date, '%Y:%m:%d %H:%M:%S')
        weekday = dateObj.weekday() #billboard only supports links on a saturday
        if weekday <= 1 or weekday == 6:
            while dateObj.weekday() != 5:
                dateObj = dateObj + datetime.timedelta(days=-1)
        else:
            while dateObj.weekday() != 5:
                dateObj = dateObj + datetime.timedelta(days=1)
        formattedDate = dateObj.strftime("%Y-%m-%d")
        chart = billboard.ChartData('hot-100', formattedDate)
        ret["Top100"] = [str(e) for e in chart.entries[:10]]


        nonTouchedDate = datetime.datetime.strptime(date, '%Y:%m:%d %H:%M:%S')
        actualFormattedDate = nonTouchedDate.strftime("%Y-%m-%d")

        #get weather
        latitude = ret.get("Latitude")
        longitude = ret.get("Longitude")
        if latitude is not None and longitude is not None:
           locObj = urlopen(Request("http://www.geoplugin.net/extras/postalcode.gp?lat=" + str(latitude) +
                                    "&long=" + str(longitude) + "&format=json")).read()
           jsonObj = json.loads(locObj)
           if type(jsonObj) is dict:
              #  print jsonObj
                postalCode = jsonObj.get("geoplugin_postCode")
                countryCode = jsonObj.get("geoplugin_countryCode")
              #  print postalCode
            #    print countryCode
                #print formattedDate
                try:
                    weatherObj = urlopen(Request("https://api.weathersource.com/v1/4d6060d10090464668ef/postal_codes/" +
                                             postalCode + "," + countryCode + "/forecast.json?period=day&" +
                                            "timestamp=" + actualFormattedDate + "&fields=tempAvg,precip,snowfall," +
                                            "windSpdAvg,cldCvrAvg,dewPtAvg,feelsLikeAvg,relHumAvg,sfcPresAvg"))\
                    .read()

                    jsonWeatherObj = json.loads(weatherObj)
                    if len(jsonWeatherObj) > 0:
                        ret["Weather"] = jsonWeatherObj[0]
                except:
                    pass

        #get s&p500 data
        try:
            sandpData = urlopen(Request("https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_GSPC.json?start_date=" +
                                        actualFormattedDate + "&end_date=" +
                                        (nonTouchedDate + datetime.timedelta(days=3)).strftime("%Y-%m-%d"))).read()
            sandpJson = json.loads(sandpData)["dataset"]
            if 'data' in sandpJson and len(sandpJson["data"]) > 0:
                ret["sandp500Open"] = sandpJson["data"][0][1] #1 is open
                ret["sandp500Close"] = sandpJson["data"][0][4] #4 is close
        except:
            print 'too many requests. no data pulled'

    newDoc.model = ret.get("Model")
    newDoc.make = ret.get("Make")
    newDoc.orientation = ret.get("Orientation")
    newDoc.date = datetime.datetime.strptime(ret.get("DateTime"), '%Y:%m:%d %H:%M:%S') if ret.get("DateTime") is not \
                                                                                          None else datetime.datetime.today()
    newDoc.width = ret.get("ExifImageWidth")
    newDoc.height = ret.get("ExifImageHeight")
    newDoc.longitude = ret.get("Longitude")
    newDoc.latitude = ret.get("Latitude")
    newDoc.top100 = json.dumps(ret.get("Top100"))
    newDoc.weather = json.dumps(ret.get("Weather"))
    newDoc.sandp500Open = ret.get("sandp500Open")
    newDoc.sandp500Close = ret.get("sandp500Close")
    newDoc.save(update_fields=["model", "make", "orientation", "date", "width", "height", "longitude", "latitude",
                               "top100", "weather", "sandp500Open", "sandp500Close"])
    return newDoc.id


def index(request):
    return render_to_response('myapp/index.html')


def getImages(request):
    # Load documents for the list page
    documents = Document.objects.all()
    # Render list page with the documents and the form
    list = []
    for d in documents:
        list.append({"url": d.docfile.url, "Model": d.model, "Make": d.make,
                      "Orientation": d.orientation, "Date": str(d.date),
                      "Width": d.width, "Height": d.height,
                      "Latitude": str(d.latitude), "Longitude": str(d.longitude),
                    "Top100": json.loads(d.top100 if d.top100 is not None else "null"),
                     "Weather": json.loads(d.weather if d.weather is not None else "null"), "id": d.id, "Mood": d.mood,
                     "Caption": d.caption, "SAndP500Open": str(d.sandp500Open), "SAndP500Close": str(d.sandp500Close),
                     "SAndPDelta": str((d.sandp500Close/d.sandp500Open - 1)*100) if d.sandp500Close is not None
                                                                                          and d.sandp500Open is not None
                     else None})

    return HttpResponse(json.dumps(list), content_type="application/json")
'''  list = [];
    for d in documents:
        ret = {}
        try:
            imageObj = Image.open('myproject' + d.docfile.url)#('myproject' + d.docfile.url)#'C:\\Users\\William\\Downloads\\IMG_2301.JPG')
            info = imageObj._getexif()
            if info is not None:
                for tag, value in info.items():
                    decoded = TAGS.get(tag, tag)
                    if decoded == "GPSInfo":
                        gps_data = {}
                        for t in value:
                            sub_decoded = GPSTAGS.get(t, t)
                            gps_data[sub_decoded] = value[t]
                        lat,long = get_lat_lon(gps_data)
                        ret["Latitude"] = lat;
                        ret["Longitude"] = long;
                    else:
                        ret[decoded] = value
        except:
            pass

        #get top songs
        date = ret.get("DateTime")
        chart = None
        if date is not None:
            dateObj = datetime.datetime.strptime(date, '%Y:%m:%d %H:%M:%S')
            weekday = dateObj.weekday() #billboard only supports links on a saturday
            if weekday <= 1 or weekday == 6:
                while dateObj.weekday() != 5:
                    dateObj = dateObj + datetime.timedelta(days=-1)
            else:
                while dateObj.weekday() != 5:
                    dateObj = dateObj + datetime.timedelta(days=1)
            formattedDate = dateObj.strftime("%Y-%m-%d")
            chart = billboard.ChartData('hot-100', formattedDate)
            ret["Top100"] = [str(e) for e in chart.entries[:10]]

        #get weather
            latitude = ret.get("Latitude")
            longitude = ret.get("Longitude")
            if latitude is not None and longitude is not None:
               locObj = urlopen(Request("http://www.geoplugin.net/extras/postalcode.gp?lat=" + str(latitude) +
                                        "&long=" + str(longitude) + "&format=json")).read()
               jsonObj = json.loads(locObj)
               if type(jsonObj) is dict:
                    print jsonObj
                    postalCode = jsonObj.get("geoplugin_postCode")
                    countryCode = jsonObj.get("geoplugin_countryCode")
                    print postalCode
                    print countryCode
                    print formattedDate
                    try:
                        weatherObj = urlopen(Request("https://api.weathersource.com/v1/4d6060d10090464668ef/postal_codes/" +
                                                 postalCode + "," + countryCode + "/forecast.json?period=day&" +
                                                "timestamp=" + formattedDate + "&fields=tempAvg,precip,snowfall," +
                                                "windSpdAvg,cldCvrAvg,dewPtAvg,feelsLikeAvg,relHumAvg,sfcPresAvg"))\
                        .read()

                        jsonWeatherObj = json.loads(weatherObj)
                        if len(jsonWeatherObj) > 0:
                            ret["Weather"] = jsonWeatherObj[0]
                    except:
                        pass


        list.append({"url": d.docfile.url, "Model": ret.get("Model"), "Make": ret.get("Make"),
                      "Orientation": ret.get("Orientation"), "Date": ret.get("DateTime"),
                      "Width": ret.get("ExifImageWidth"), "Height": ret.get("ExifImageHeight"),
                      "Latitude": ret.get("Latitude"), "Longitude": ret.get("Longitude"),
                    "Top100": ret.get("Top100"), "Weather": ret.get("Weather")})

    return HttpResponse(json.dumps(list), content_type="application/json")'''

def _get_if_exist(data, key):
    if key in data:
        return data[key]

    return None


def _convert_to_degress(value):
    """Helper function to convert the GPS coordinates stored in the EXIF to degress in float format"""
    d0 = value[0][0]
    d1 = value[0][1]
    d = float(d0) / float(d1)

    m0 = value[1][0]
    m1 = value[1][1]
    m = float(m0) / float(m1)

    s0 = value[2][0]
    s1 = value[2][1]
    s = float(s0) / float(s1)

    return d + (m / 60.0) + (s / 3600.0)


def get_lat_lon(gps_info):
    """Returns the latitude and longitude, if available, from the provided exif_data (obtained through get_exif_data above)"""
    lat = None
    lon = None

    gps_latitude = _get_if_exist(gps_info, "GPSLatitude")
    gps_latitude_ref = _get_if_exist(gps_info, 'GPSLatitudeRef')
    gps_longitude = _get_if_exist(gps_info, 'GPSLongitude')
    gps_longitude_ref = _get_if_exist(gps_info, 'GPSLongitudeRef')

    if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
        lat = _convert_to_degress(gps_latitude)
        if gps_latitude_ref != "N":
            lat = 0 - lat

        lon = _convert_to_degress(gps_longitude)
        if gps_longitude_ref != "E":
            lon = 0 - lon

    return lat, lon