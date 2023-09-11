from django.contrib import admin
from .models import *


# admin.site.register(GlobalSettings)
admin.site.register(ContactUS)
# admin.site.register(Page_Type)
admin.site.register(Navigation)



@admin.register(GlobalSettings)
class GlobalSettings(admin.ModelAdmin):
  list_filter = ('SiteName','SiteEmail','SiteContact')
  list_display = ('SiteName','SiteEmail','SiteContact')
