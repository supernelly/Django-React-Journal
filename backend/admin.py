from django.contrib import admin
from .models import Entry

class EntryAdmin(admin.ModelAdmin):
        list_display = ('title','body', 'username')

# Register your models here.
admin.site.register(Entry, EntryAdmin)