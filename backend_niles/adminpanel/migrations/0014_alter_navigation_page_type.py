# Generated by Django 4.2.4 on 2023-08-26 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0013_alter_navigation_page_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='navigation',
            name='page_type',
            field=models.CharField(blank=True, choices=[('Home', 'Home'), ('Slider', 'Slider'), ('About/company', 'About/company'), ('About/legal doc', 'About/legal doc'), ('gallery/doc', 'gallery/doc'), ('who we are', 'who we are'), ('what we offer', 'what we offer'), ('what we do', 'what we do'), ('clients', 'clients'), ('About/Who we are', 'About/Who we are'), ('company profile', 'company profile'), ('Message from Chairman', 'Message from Chairman'), ('objective', 'objective'), ('organization chart', 'organization chart'), ('legal documents', 'legal documents'), ('Gallery', 'Gallery'), ('Mission & Vision', 'Mission & Vision'), ('company/Director Profile', 'comapny/Director Profile')], max_length=50, null=True),
        ),
    ]