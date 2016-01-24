from django.conf.urls import patterns, include, url

urlpatterns = patterns('myapp.views',
    url(r'^$', 'fileUpload', name='fileUpload'),
    url(r'^list/$', 'fileUpload', name='fileUpload'),
    url(r'^getImages/$', 'getImages', name='getImages'),
    url(r'^setMood/$', 'setMood', name='setMood')
)

