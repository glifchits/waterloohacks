from django.conf.urls import patterns, include, url

urlpatterns = patterns('myapp.views',
    url(r'^$', 'list', name='list'),
    url(r'^list/$', 'list', name='list'),
    url(r'^jsonResult/$', 'jsonResult', name='jsonResult'),
)

