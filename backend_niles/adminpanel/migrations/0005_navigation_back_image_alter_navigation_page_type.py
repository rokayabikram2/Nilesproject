# Generated by Django 4.2.4 on 2023-08-24 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0004_alter_navigation_page_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='navigation',
            name='back_image',
            field=models.ImageField(null=True, upload_to='background/'),
        ),
        migrations.AlterField(
            model_name='navigation',
            name='page_type',
            field=models.CharField(blank=True, choices=[('Home', 'Home'), ('Vision', 'Vision'), ('Mission', 'Mission'), ('Home/About', 'Home/About'), ('Documents', 'Documents'), ('who we are', 'who we are'), ('what we offer', 'what we offer'), ('Registration/Approval', 'Registration/Approval'), ('About', 'About'), ('Our Message', 'Our Message'), ('Our Commitment', 'Our Commitment'), ('Pop', 'Pop'), ('Contact', 'Contact'), ('Organizational Chart', 'Organizational Chart'), ('Demand Letter', 'Demand Letter'), ('Job Seeker', 'Job Seeker'), ('Recruiting Procedure', 'Recruiting Procedure'), ('Recruiting Documents', 'Recruiting Documents'), ('Gallery', 'Gallery'), ('Slider', 'Slider'), ('Service', 'Service'), ('Amity/Service', 'Amity/Service'), ('Newspaper Vacancy', 'Newspaper Vacancy'), ('Our Service', 'Our Service'), ('Requirement', 'Requirement'), ('Group', 'Group'), ('Normal', 'Normal'), ('Talent', 'Talent'), ('UNSKILLED', 'UNSKILLED'), ('THE PROFESSIONALS', 'THE PROFESSIONALS'), ('SEMI-SKILLED', 'SEMI-SKILLED'), ('SKILLED', 'SKILLED'), ('HIGHLYSKILLED', 'HIGHLYSKILLED'), ('TESTIMONIAL', 'TESTIMONIAL'), ('COUNTRIES', 'COUNTRIES'), ('Home1', 'Home1'), ('Job', 'Job'), ('Job1', 'Job1'), ('Job2', 'Job2'), ('Job3', 'Job3'), ('News', 'News'), ('Gall', 'Gall'), ('Recruitment', 'Recruitment'), ('Home2', 'Home2'), ('Home3', 'Home3'), ('Home4', 'Home4'), ('Home5', 'Home5'), ('Home6', 'Home6'), ('UNSKILLED LABOUR', 'UNSKILLED LABOUR'), ('SEMI-SKILLED STAFF', 'SEMI-SKILLED STAFF')], max_length=50, null=True),
        ),
    ]
