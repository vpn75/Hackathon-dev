angular.module('FHIRapp.controllers',['ngSanitize']).

    controller('reportSelectController', function($scope, FHIRqueryservice) {
    
    //Official Report Categories from HL7/FHIR standard
        $scope.repCat = 
            [
                
                {"code":"CH","display":"Chemistry"},
                {"code":"HM","display":"Hematology"},
                {"code":"LAB","display":"Laboratory"},
                {"code":"RAD","display":"Radiology"},
                {"code":"RC","display":"Respiratory Care (therapy)"},
            
            ];


        $scope.fetch = function() {
            var urlparams = {};

            if ($scope.name) {
                urlparams.subject = "Patient/" + $scope.name;
            }
            if ($scope.status) {
                urlparams.status = $scope.status;
            }

            urlparams.service = $scope.reportType;
            
            FHIRqueryservice.getPatientReports(urlparams).success(function (response) {
               
                $scope.reports = response.entry;
                $scope.totalResults = response.totalResults;
                $scope.navlinks = $scope.navButton(response.link);
                $scope.reportBody = '';
                console.log(response);
            });

        }

        $scope.navSnapshot = function(url) {
            FHIRqueryservice.getSnapshot(url)
                .success(function (response) {
                    $scope.reports = response.entry;
                    console.log(response);
                    $scope.navlinks = $scope.navButton(response.link);

                });
        }

        $scope.navButton = function(navlink) {
            var links = [];
            for(var i=0; i < navlink.length; ++i) {
                if (navlink[i].rel === "self" || navlink[i].rel === "fhir-base") {
                    //Do nothing
                }
                else {
                    links.push(navlink[i]);
                }
            }
            //console.log(links);
            return links;
        }
        
        $scope.setStylebyStatus = function (status) {
            var style = {};
            if (status === 'partial') {
                style["background-color"] = "#FFFFCC";
            }
            else {
                style["background-color"] = "white";
            }
            return style;
        }

        $scope.displayReport = function (text, title, identifier) {
            $scope.reportBody = text;
            $scope.reportTitle = title;
            $scope.accession = identifier;
        }
    
}).

controller('reportController', function($scope, $routeParams, FHIRqueryservice) {
    
    $scope.id = $routeParams.id;

    var urlparams = {};
    urlparams.subject = "Patient/" + $routeParams.id;

    $scope.selectedRow = null;

    $scope.setClickedRow = function (index) {
        $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
        console.log("Clicked row# " + index);
    }

    FHIRqueryservice.getPatientReports(urlparams)
        .success(function (response) {
            $scope.reports = response.entry;
            $scope.totalResults = response.totalResults;
            $scope.navlinks = $scope.navButton(response.link);
            $scope.reportBody = '';
            console.log(response);
        });

    FHIRqueryservice.getPatient($routeParams.id)
        .success(function (response) {
            $scope.name = response.name[0];
            $scope.mrn = response.identifier[0].value;
            $scope.DOB = response.birthDate;
            $scope.gender = response.gender.coding[0].display;
        })

        $scope.displayfullName = function(name) {
            var family = name.family ? name.family[0] : '';
            var given = name.given ? name.given[0] : '';
            return family + ", " + given;
        }

       $scope.navSnapshot = function(url) {
            FHIRqueryservice.getSnapshot(url)
                .success(function (response) {
                    $scope.reports = response.entry;
                    console.log(response);
                    $scope.navlinks = $scope.navButton(response.link);

                });
        }

        $scope.navButton = function (navlink) {
            var links = [];
            for(var i=0; i < navlink.length; ++i) {
                if (navlink[i].rel === "self" || navlink[i].rel === "fhir-base") {
                    //Do nothing
                }
                else {
                    links.push(navlink[i]);
                }
            }
            //console.log(links);
            return links;
        }
        
        $scope.setStylebyStatus = function (status) {
            var style = {};
            if (status === 'partial') {
                style["background-color"] = "#FFFFCC";
            }
            else {
                style["background-color"] = "white";
            }
            return style;
        }

        $scope.displayReport = function (text, title, identifier) {
            $scope.reportBody = text;
            $scope.reportTitle = title;
            $scope.accession = identifier;
        }
}).


controller('patientController', function($scope, FHIRqueryservice) {

        $scope.fetchPatients = function() {
            var urlparams = {};

            if ($scope.familyname) {
                urlparams.family = $scope.familyname;
            }
            if ($scope.patientID) {
                urlparams.identifier = $scope.patientID;
            }
            if ($scope.gender) {
                urlparams.gender = $scope.gender;
            }
        
            FHIRqueryservice.getPatients(urlparams)
                .success(function (response) {
                    $scope.patients = response.entry;
                    $scope.totalResults = response.totalResults;
                    $scope.navlinks = $scope.navButton(response.link);
                    console.log(response);
            });
        }

        
        $scope.parseName = function(patient) {
            var n = patient.id.lastIndexOf('/');
            var id = patient.id.substring(n + 1);

            return id;
        }

        $scope.displayfullName = function(name) {
            var family = name.family ? name.family[0] : '';
            var given = name.given ? name.given[0] : '';
            return family + ", " + given;
        }

        $scope.navSnapshot = function(url) {
            FHIRqueryservice.getSnapshot(url)
                .success(function (response) {
                    $scope.patients = response.entry;
                    console.log(response);
                    $scope.navlinks = $scope.navButton(response.link);

                });
        }

        $scope.navButton = function(navlink) {
            var links = [];
            for(var i=0; i < navlink.length; ++i) {
                if (navlink[i].rel === "self" || navlink[i].rel === "fhir-base") {
                    //Do nothing
                }
                else {
                    links.push(navlink[i]);
                }
            }
            //console.log(links);
            return links;
        }

});