# Generated by Django 4.2.4 on 2023-08-26 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0021_alter_navigation_page_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='navigation',
            name='page_type',
            field=models.CharField(blank=True, choices=[('Home', 'Home'), ('Slider', 'Slider'), ('About/company', 'About/company'), ('About/legal doc', 'About/legal doc'), ('gallery/doc', 'gallery/doc'), ('who we are', 'who we are'), ('what we offer', 'what we offer'), ('what we do', 'what we do'), ('clients', 'clients'), ('About/Who we are', 'About/Who we are'), ('company profile', 'company profile'), ('Message from Chairman', 'Message from Chairman'), ('objective', 'objective'), ('organization chart', 'organization chart'), ('legal documents', 'legal documents'), ('Gallery', 'Gallery'), ('Mission & Vision', 'Mission & Vision'), ('company/Director Profile', 'comapny/Director Profile'), ('Recruitment Process', 'Recruitment Process'), ('Client-Candidate Matching', 'Client-Candidate Matching'), ('Required Documents', 'Required Documents'), ('Service/Required Documents', 'Service/Required Documents'), ('Industry Expertise', 'Industry Expertise'), ('Job Category', 'Job Category'), ('Unskilled', 'Unskilled'), ('skilled', 'skilled'), ('semi-skilled', 'semi-skilled'), ('Highly-skilled', 'Highly-skilled'), ('Unskilled/job', 'Unskilled/job'), ('skilled/job', 'skilled/job'), ('semi-skilled/job', 'semi-skilled/job'), ('Highly-skilled/job', 'Highly-skilled/job'), ('contact us', 'contact us'), ('Vacancy', 'Vacancy'), ('New Vacancy', 'New Vacancy'), ('Newspaper Vacancy', 'Newspaper Vacancy'), ('New/Newspaper Vacancy', 'New/Newspaper Vacancy')], max_length=50, null=True),
        ),
    ]
