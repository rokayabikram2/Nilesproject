# Generated by Django 4.2.4 on 2023-08-27 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0022_alter_navigation_page_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactus',
            name='mobile',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
