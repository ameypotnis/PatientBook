var PatientViewModel = function() {
    self = {};
    var blank = '';
    var URI = 'http://localhost:3000';

    self.objectId = 0;
    self.firstName = ko.observable(blank).extend({ required: true });
    self.middleName = ko.observable(blank);
    self.lastName = ko.observable(blank).extend({ required: true });;
    self.age = ko.observable(blank).extend({ required: true });;
    self.sex = ko.observable(blank).extend({ required: true });;
    self.maritalStatus = ko.observable(blank);

    self.complaint = ko.observable(blank);
    self.associatedComplaint = ko.observable(blank);
    self.histories = ko.observableArray();

    self.lastSavedJson = ko.observable("");
    self.hasSuccessfullySaved = ko.observable(false);
    self.hasSuccessfullyLoaded = ko.observable(false);

    //private
    function validate() {
        if(!(self.firstName.isValid()
            && self.lastName.isValid()
            && self.age.isValid()
            && self.sex.isValid())) throw new Error("Please fill all required fields");
    }

    self.add = function() {
        validate();
        var data = { firstName: self.firstName(), middleName: self.middleName(), lastName: self.lastName(), age: self.age(), sex: self.sex() };
        jQuery.ajax({
            url: URI + "/patients",
            data: data,
            type: "POST",
            dataType: "json",
            success: function(data){
                self.hasSuccessfullySaved(true);
            }
        });

    }

    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self), null, 2));
    };

    self.load = function(_id){
        jQuery.ajax({
            url: URI + "/patients/" + _id,
            dataType: "json",
            success: function(data) {
                self.hasSuccessfullyLoaded(true);
                //not working
                // ko.mapping.fromJS(data[1], self);
                alert(data._id);
                self.objectId = data._id;
                self.firstName(data.firstName);
                self.lastName(data.lastName);
                self.age(data.age);
                self.sex(data.sex);
//                self.histories(data.histories);
            }
        });
    }

    self.addHistory = function(){
        self.histories.push({key: '', value: ''});
    }

    self.saveHistory = function(){
        var data = { histories: self.histories() };
        jQuery.ajax({
            url: URI + "/patients/" + self.objectId,
            data: data,
            type: "PUT",
            dataType: "json",
            success: function(data){
                self.hasSuccessfullySaved(true);
            }
        });
    }

    return self;
}
