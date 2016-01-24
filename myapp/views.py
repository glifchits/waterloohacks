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

def fileUpload(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('fileUpload'))
    else:
        form = DocumentForm() # A empty, unbound form
    # Load documents for the list page
    documents = Document.objects.all()
    # Render list page with the documents and the form
    return render_to_response(
            'myapp/fileUpload.html',
        {'documents': documents, 'form': form},
        context_instance=RequestContext(request)
    )


def index(request):
    return render_to_response('myapp/index.html')


def getImages(request):
    # Load documents for the list page
    documents = Document.objects.all()
    # Render list page with the documents and the form
    #for d in documents:
    list = [];
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
            chart = billboard.ChartData('hot-100', dateObj.strftime("%Y-%m-%d"))
            ret["Top100"] = [str(e) for e in chart.entries[:10]]

        #get weather
         #   latitude = ret.get("Latitude")
          #  longitude = ret.get("Longitude")
          #  if latitude is not None and longitude is not None:
               # location = geolocator.reverse(str(latitude) + ", " + str(longitude))

        list.append({"url": d.docfile.url, "Model": ret.get("Model"), "Make": ret.get("Make"),
                      "Orientation": ret.get("Orientation"), "Date": ret.get("DateTime"),
                      "Width": ret.get("ExifImageWidth"), "Height": ret.get("ExifImageHeight"),
                      "Latitude": ret.get("Latitude"), "Longitude": ret.get("Longitude"),
                    "Top100": ret.get("Top100")})

    return HttpResponse(json.dumps(list), content_type="application/json")


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