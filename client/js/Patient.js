var PatientViewModel = function() {
    var self = this;
    var blank = '';

    self.firstName = ko.observable(blank).extend({ required: true });
    self.middleName = ko.observable(blank);
    self.lastName = ko.observable(blank).extend({ required: true });;
    self.age = ko.observable(blank).extend({ required: true });;
    self.sex = ko.observable(blank).extend({ required: true });;
    self.maritalStatus = ko.observable(blank);

    self.complaint = ko.observableArray();
    self.history = ko.observableArray();

    self.lastSavedJson = ko.observable("");
    self.hasSuccessfullySaved = ko.observable(false);

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
            url: "http://localhost:3000/patient",
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
}
