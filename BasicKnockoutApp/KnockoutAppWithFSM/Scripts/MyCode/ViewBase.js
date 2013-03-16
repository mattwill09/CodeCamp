function ViewBase() {
    /* Properties */
    this.ShowMap = true;
    this.Container = null;
    this.Holder = null;
    this.Instructions = null;
    this.VideoSlider = null;
    this.VideoPlayer = null;
    this.Help = null;

    /* Methods */
    this.Next = function () {
        ViewManagerInstance.NextStep();
    };

    this.Back = function () {
        ViewManagerInstance.PreviousStep();
    };

    this.Show = function () { this.ShowContainer(); };
    this.Hide = function () { this.HideContainer(); };

    this.ShowContainer = function () {

        if (this.Container !== null) {
            this.Container.appendTo($('#current-view'));
            this.Container.show();
        }
    };

    this.HideContainer = function () {
        if (this.Container !== null) {
            this.Container.hide();
            this.Container.insertBefore($('#current-view'));
        }
    };

}

var ViewBaseInstance = new ViewBase();