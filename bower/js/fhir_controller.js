angular.module('FHIRapp.controllers',['ngSanitize']).

    controller('reportSelectController', function($scope, $sce, FHIRqueryservice) {
    
    //Official Report Categories from HL7/FHIR standard
        $scope.repCat = 
            [
                {"code":"AU","display":"Audiology"},
                {"code":"BG","display":"Blood Gases"},
                {"code":"BLB","display":"Blood Bank"},
                {"code":"CH","display":"Chemistry"},
                {"code":"CP","display":"Cytopathology"},
                {"code":"CT","display":"CAT Scan"},
                {"code":"CTH","display":"Cardiac Catheterization"},
                {"code":"CUS","display":"Cardiac Ultrasound"},
                {"code":"EC","display":"Electrocardiac"},
                {"code":"EN","display":"Electroneuro"},
                {"code":"HM","display":"Hematology"},
                {"code":"ICU","display":"Bedside ICU Monitoring"},
                {"code":"IMG","display":"Diagnostic Imaging"},
                {"code":"IMM","display":"Immunology"},
                {"code":"LAB","display":"Laboratory"},
                {"code":"MB","display":"Microbiology"},
                {"code":"MCB","display":"Mycobacteriology"},
                {"code":"MYC","display":"Mycology"},
                {"code":"NMR","display":"Nuclear Magnetic Resonance"},
                {"code":"NMS","display":"Nuclear Medicine Scan"},
                {"code":"NRS","display":"Nursing Service Measures"},
                {"code":"OSL","display":"Outside Lab"},
                {"code":"OT","display":"Occupational Therapy"},
                {"code":"OTH","display":"Other"},
                {"code":"OUS","display":"OB Ultrasound"},
                {"code":"PAR","display":"Parasitology"},
                {"code":"PAT","display":"Pathology"},
                {"code":"PF","display":"Pulmonary Function"},
                {"code":"PHR","display":"Pharmacy"},
                {"code":"PHY","display":"Physician"},
                {"code":"PT","display":"Physical Therapy"},
                {"code":"RAD","display":"Radiology"},
                {"code":"RC","display":"Respiratory Care (therapy)"},
                {"code":"RT","display":"Radiation Therapy"},
                {"code":"RUS","display":"Radiology Ultrasound"},
                {"code":"RX","display":"Radiograph"},
                {"code":"SP","display":"Surgical Pathology"},
                {"code":"SR","display":"Serology"},
                {"code":"TX","display":"Toxicology"},
                {"code":"URN","display":"Urinalysis"},
                {"code":"VR","display":"Virology"},
                {"code":"VUS","display":"Vascular Ultrasound"},
                {"code":"XRC","display":"Cineradiograph"}
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
                console.log(response);
            });

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
    }
/*
    $scope.setName = function(subject) {
        
        var name = FHIRqueryservice.getPatientName(subject);
        return name.family + ',' + name.given;
    }

    $scope.fetch = function() {
        var url = "http://fhir.hackathon.siim.org/fhir/DiagnosticReport";
        var urlparams = {};
        if ($scope.name) {
            urlparams.subject = "Patient/" + $scope.name;
        }
        urlparams.service = $scope.reportType;

        var req = {
            params:urlparams,
            headers: {
                "Accept" : "application/json"
            }
        }
        
        $http.get(url,req).success(function(data) {
            $scope.totalResults = data.totalResults;
            $scope.reports = data.entry;
            console.log(data);
        }); 
    }       */  
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