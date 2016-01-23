# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
import json
from myapp.models import Document
from myapp.forms import DocumentForm


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
    list = [d.docfile.url for d in documents]
    return HttpResponse(json.dumps(list), content_type="application/json")
