from mongoengine import Document, StringField, FloatField, DateTimeField, DictField

class FloodData(Document):
    FACILITY_TYPES = [
        ('hospital', 'Hospital'),
        ('evacuation_center', 'Evacuation Center'),
        ('other', 'Other')
    ]

    type = StringField(max_length=50, choices=FACILITY_TYPES, default='other')
    name = StringField(max_length=255, required=True)
    location = StringField(max_length=255, required=True)
    water_level = FloatField(required=True)
    risk_level = StringField(max_length=50, required=True)
    timestamp = DateTimeField(auto_now_add=True)
    description = StringField(required=False)
    coordinates = DictField(required=True)

    meta = {
        'collection': 'Locations',
        'indexes': ['timestamp']
    }

    def __str__(self):
        return f"{self.type} - {self.name} at {self.location} ({self.timestamp})"
    



class PublicAlert(Document):

    alertTitle = StringField(max_length=255, required=True)
    alertMessage = StringField(max_length=255,required= True)
    instructions = StringField(max_length=255,required= True)
    coordinates = DictField(required=True)


    # meta = {
    #     'collection': 'Locations',
    #     'indexes': ['timestamp']
    # }

    def __str__(self):
        return f"{self.type} - {self.name} at {self.location} ({self.timestamp})"
    



class Messages(Document):
    Message = StringField(max_length=255,required = True)
    UserSend = StringField(max_length = 255,required = True)