describe("Order viewmodel", function() {
    var viewModel;

    beforeEach(function() {
        //given
        viewModel = new PatientViewModel();

        this.addMatchers({
            toBeNotNullAndNotBlank: function() {
                return (this.actual != null && this.actual !== '');
            }
        });
    });

    it("initializes", function() {
        var blank = '';
        expect(viewModel.firstName()).toEqual(blank);
        expect(viewModel.middleName()).toEqual(blank);
        expect(viewModel.lastName()).toEqual(blank);
        expect(viewModel.age()).toEqual(blank);
        expect(viewModel.sex()).toEqual(blank);
        expect(viewModel.maritalStatus()).toEqual(blank);

        expect(viewModel.complaint().length).toEqual(0);
        expect(viewModel.complaint().length).toEqual(0);

        //check validations
        expect(function(){viewModel.add()}).toThrow(new Error('Please fill all required fields'));
    });

    it("Send Patient to server", function() {
        var blank = '';
        viewModel.firstName('Sam');
        viewModel.lastName('Low');
        viewModel.age(52);
        viewModel.sex('M');

        viewModel.add();

        waitsFor(function() {
            return viewModel.hasSuccessfullySaved();
        }, "The patient should be saved");

        runs(function () {
            /*expect(parseInt(viewModel.patients()[1].age)).toBe(50);*/
        });

    });

    it("Load single Patient from server", function() {
        viewModel.load('Sam');

        waitsFor(function() {
            return viewModel.hasSuccessfullyLoaded();
        }, "The patient should be loaded");

        runs(function () {
            expect(viewModel.firstName()).toBeNotNullAndNotBlank();
            expect(viewModel.lastName()).toBeNotNullAndNotBlank();
            expect(viewModel.age()).toBeNotNullAndNotBlank();
            expect(viewModel.sex()).toBeNotNullAndNotBlank();
        });

    });

})