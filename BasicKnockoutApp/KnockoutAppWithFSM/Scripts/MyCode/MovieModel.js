var m_names = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");

function Movie() {
    var self = this;

    self.ID = ko.observable(null);
    self.Title = ko.observable(null);
    self.ReleaseDate = ko.observable(null);
    self.Genre = ko.observable(null);
    self.Price = ko.observable(null);
    self.Rating = ko.observable(null);

    self.DisplayDate = ko.computed({
        read: function () {
            if (self.ReleaseDate() !== null) {
                var d = self.ReleaseDate();
                var curr_date = d.getDate();
                var curr_month = d.getMonth();
                var curr_year = d.getFullYear();
                return m_names[curr_month] + ' ' + curr_date + ", " + curr_year;
            } else {
                return '';
            }
        },
        write: function (value) {
            try {
                self.ReleaseDate(Date.parse(value));
            } catch (ex) {
                console.log(ex);
                self.ReleaseDate(null);
            }
        }
    });
}

Movie.prototype.toJSON = function () {
    var copy = ko.toJS(this); //easy way to get a clean copy
    delete copy.DisplayDate; //remove an extra property
    return copy; //return the copy to be serialized
};