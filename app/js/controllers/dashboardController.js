lectureApp.controller('dashboardController', ['lectureService', '$cookies', '$log', '$window', '$scope',
    function (lectureService, $cookies, $log, $window, $scope) {
        let self = this;

        self.init = function () {
            self.lectureService = lectureService;
            self.isLoading = false;
            self.isLoggedIn = false;

            self.lecture = $cookies.get('lecture');
            self.username = '';
            self.userID = '';
            self.studentsFound = [];
            self.userID = $cookies.get('userID');

            self.lectures = []; // [{name: "Lec1"}, {name: "Lec2"}, {name: "Lec3"}, {name: "Lec1"}];
            $log.debug('Current user ID from cookie is ' + self.userID);
            self.expireDate = new Date('December 31, 2025 03:24:00');

            if (self.userID !== undefined && self.userID !== '') {
                self.authenticate();
            }
            self.populateLectures();

        };



        self.performSearch = function () {
            self.isLoading = true;
            self.lectureService.search(self.username).then(function (result) {
                self.isLoading = false;
                self.studentsFound = result.data.results;
            }, function (err) {
                alert("An error occured: " + err);
            });
        };

        self.register = function () {
            if (self.username === undefined || self.username === '') {
                return;
            }

            self.isLoading = true;
            /*
            self.lectureService.register(self.username).then(function (result) {
                self.isLoading = false;
                self.studentsFound = result.data.results;

                $cookies.put('userID', result.data.userID, {
                    expires: self.expireDate,
                    path: '/'
                });
                self.isLoggedIn = true;

            }, function (err) {
                alert("An error occured: " + err);
            });
            */
            self.isLoading = false;
            $cookies.put('userID', "1234", {
                expires: self.expireDate,
                path: '/'
            });

            $log.debug('Registered user ' + self.username + ' with ID ' + self.userID);
            self.authenticate();
        };

        self.authenticate = function () {
            // query username from api
            self.username = "tom";
            self.isLoggedIn = true;

            $log.debug('Authenticated user ' + self.username + ' with ID ' + self.userID);
        };

        self.logout = function () {
            $cookies.put('userID', '', {
                expires: self.expireDate,
                path: '/'
            });
            $log.debug('Logged out user ' + self.username + ' with ID ' + self.userID);
            self.username = undefined;
            self.isLoggedIn = false;
            $window.location.href = 'index.html';
        };

        self.chooseLecture = function (lecture) {
            $log.debug("Lecture " + lecture.name + "chosen");
            $cookies.put('lecture', lecture.name, {
                expires: self.expireDate,
                path: '/'
            });
            $window.location.href = 'lecture.html';
        };

        self.populateLectures = function() {
            self.isLoading = true;
            self.lectureService.getLectures().then(function (result) {
                self.isLoading = false;
                self.lectures = result.data.results;
                $log.debug("Lectures: " + JSON.stringify(self.lectures));
            }, function (err) {
                alert("An error occured: " + err);
            });
        };

        self.init();

    }]);