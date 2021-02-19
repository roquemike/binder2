
from django import forms
from .models import Image

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('name', 'description', 'tag', )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'form-control-file'}, id='name', )
        self.fields['description'].widget.attrs.update({'class': 'form-control form-group form-inline'}, id='description', )
        self.fields['tag'].widget.attrs.update({'class': 'form-select form-group'}, id='tag', )
