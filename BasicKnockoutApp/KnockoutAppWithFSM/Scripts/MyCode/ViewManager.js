function ViewManager() {
    var self = this;

    var fsm = StateMachine.create(
        {
            initial: { state: 'init', event: 'init' },
            error: function (eventName, from, to, args, errorCode, errorMessage) {
                console.log(from + ':' + to + ' event ' + eventName + ' caused the following error ' + errorMessage);
            },
            events: [
                { name: 'Home', from: 'init', to: 'Home' },
                { name: 'Edit', from: 'Home', to: 'Edit' },
                { name: 'Delete', from: 'Home', to: 'Delete' },
                { name: 'New', from: 'Home', to: 'New' },
                { name: 'Inquire', from: 'Home', to: 'Inquire' },
                { name: 'Back', from: 'Edit', to: 'Home' },
                { name: 'Back', from: 'Delete', to: 'Home' },
                { name: 'Back', from: 'New', to: 'Home' },
                { name: 'Back', from: 'Inquire', to: 'Home' },
                { name: 'Submit', from: 'Edit', to: 'Home' },
                { name: 'Submit', from: 'Delete', to: 'Home' },
                { name: 'Submit', from: 'New', to: 'Home' }
            ]
        }
    );

    fsm.onleavestate = function (event, from, to) {
        if (from === 'none' || from === 'init') return;

        self.Views[from].Hide();
    };

    fsm.onenterHome = function (event, from, to, data) {
        console.log(event);
        if (event !== 'Back') {
            try {
                console.log('getting movie list');
                self.Views.Home.GetMovieList();
            } catch (ex) {
                console.log(ex);
            }
        }
    };

    fsm.onbeforeSubmit = function (event, from, to, data) {
        if (from === 'Edit') {

        }
    }

    fsm.onenterstate = function (event, from, to, data) {
        self.Views[to].Show(data);
    };

    /* Public Properties */
    self.Views = {
        "Home": new HomeView(),
        "Edit": new EditView(),
        "Delete": new DeleteView(),
        "New": new NewView(),
        "Inquire": new InquireView(),
    };

    ///* Navigation Methods */
    //self.NextStep = function () {
    //    if (fsm.can('Next')) fsm.Next();
    //};

    //self.PreviousStep = function () {
    //    if (fsm.can('Back')) fsm.Back();
    //};

    self.EditMovie = function (data) {
        if (fsm.cannot('Edit')) return;
        console.log(data);
        fsm.Edit(data);
    };

    self.ViewMovie = function () {
        if (fsm.cannot('View')) return;

        fsm.View();
    };

    self.DeleteMovie = function () {
        if (fsm.cannot('Delete')) return;

        fsm.Delete();
    };

    self.AddMovie = function () {
        if (fsm.cannot('Add')) return;

        fsm.Add();
    };

    self.Back = function () {
        if (fsm.cannot('Back')) return;

        fsm.Back();
    };

    self.Submit = function () {
        if (fsm.cannot('Submit')) return;

        fsm.Submit();
    };

    // Initializes the manager
    function init() {
        fsm.Home();
    }

    // Initialize
    init();

    console.log('applying bindings');
    // Apply the bindings
    ko.applyBindings(this);
}