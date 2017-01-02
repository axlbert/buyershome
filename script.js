var iniLocations = [{
  clickCount: 0,
  name: "Solenoid",
  descr: "a great view",
  article : ko.observable(),
  coords: {
    lat: 50.364409,
    lng: 7.614130
  }
}, {
  clickCount: 0,
  name: "Pressure Relief",
  descr: "an awesome green",
  article : ko.observable(),
  coords: {
    lat: 50.355523,
    lng: 7.602743
  }
}, {
  clickCount: 0,
  name: "Shutoff Valve",
  descr: "two rivers at once",
  article : ko.observable(),
  coords: {
    lat: 50.364555,
    lng: 7.606087
  }
}, {
  clickCount: 0,
  name: "Valve Isle",
  descr: "a Fountain!",
  article : ko.observable(),
  coords: {
    lat: 50.360200,
    lng: 7.598058
  }
}, {
  clickCount: 0,
  name: "2-Solenoid",
  descr: "trains",
  article : ko.observable(),
  coords: {
    lat: 50.358886,
    lng: 7.590677
  }
}, {
  clickCount: 0,
  name: "Solenoid Budget",
  descr: "a nice building",
  article : ko.observable(),
  coords: {
    lat: 50.360793,
    lng: 7.595737
  }
}, {
  clickCount: 0,
  name: "Lorem Ipsum",
  descr: "neat architecture",
  article : ko.observable(),
  coords: {
    lat: 50.355461,
    lng: 7.603140
  }
}, {
  clickCount: 0,
  name: "Steam Trap",
  descr: "an old building",
  article : ko.observable(),
  coords: {
    lat: 50.362062,
    lng: 7.603766
  }
}, {
  clickCount: 0,
  name: "Steam Trap Pharma",
  descr: "an old square",
  article : ko.observable(),
  coords: {
    lat: 50.358631,
    lng: 7.610564
  }
}];

  /**ViewModel aka Octopus*/
  
var allSuppliers = ["Weico","Bba","Hin","Lnp","Ohnics","Schmalzer","Lumax Reco","Kroxx","Schmautzke","Supplier X","Julpschke"]; 

var ViewModel = function() {
    /**launching the google map*/
    var self = this;
    self.showStartpage = ko.observable();
    self.input = ko.observable('');    
    self.currentCategory = ko.observable();
    self.showCategoryPage = ko.observable();
    self.showStartpage2 = ko.observable();
    self.filterList = ko.observableArray([]); 
	self.basket_count = ko.observable(0);
	self.basket_item = ko.observable("x Solenoid");
    self.categoryList = ko.observableArray(["Valves","Motors","Pumps","Sensors","Pneumatics","Metal","Wood","Logistics","Packaging","Electronics"]);
	self.supplierName = ko.observableArray([]);
	self.availableApplications = ko.observableArray(["Electric Drive","Pneumatic Actuation","Sensors"]);
	self.solutionShown = ko.observable();
	
	
	
	self.expandCATMenu = function () {
		$("#catSuppliers").removeClass("sidebar-menu-collapsed").addClass("sidebar-menu-expanded");
		};

    self.collapseCATMenu = function () {
		$("#catSuppliers").removeClass("sidebar-menu-expanded").addClass("sidebar-menu-collapsed");
		};
	self.buildSupplerListRandom = function () {
		for (i = 0; i < allSuppliers.length ; i++) {
			if (Math.random() > 0.5) { 
					self.supplierName.push(allSuppliers[i]);
				};
			};
		};
	
	self.showSolution = function () {
		self.solutionShown(true);
	};
	
    self.init_page = function(){
      self.showStartpage(true);
      self.showCategoryPage(false);
      self.showStartpage2(false);
	  self.input('');
	  self.collapseCATMenu();
	  self.solutionShown(false);
    };

    self.init_page();

    /** populating a copy of the locationlist with the dataset for better filtering*/
    self.buildFilterList = function(val) {
      iniLocations.forEach(function(val) {
        self.filterList.push(val);
        
      });
    };
	self.increment_basket = function() {
		self.basket_count(self.basket_count()+1);
		self.basket_sfx();
	};
	
	
	
	
	self.basket_sfx = function(){	
		$("#basket" ).css( "font-size", "20px" );
		setTimeout(function(){$("#basket" ).css( "font-size", "14px" );},100);
	};

    /** triggering the above mentioned*/
    self.buildFilterList();

    self.showCategory = function($data){
      self.supplierName.removeAll();
	  self.showStartpage(false);
      self.currentCategory($data);
      self.showCategoryPage(true);
      self.showStartpage2(false);
	  self.buildSupplerListRandom();
	  self.expandCATMenu();
	  
	  
    };
  
    self.showBestPrice = function(){
      self.showStartpage2(true);
    };


    self.filterFunc = function() {
      self.filterList.removeAll();
      
      var filterInput = self.input().toLowerCase();
      if (filterInput.length > 0) {
        //console.log("filter function is hit");
        iniLocations.forEach(function(val) {
          //self.markerArray.push(new self.constructMarkers(val));
          if (val.name.toLowerCase().indexOf(filterInput) >= 0) {

            //console.log("if clause of filter function is hit");
            self.filterList.push(val);

            self.showStartpage(false);
            self.showCategoryPage(true);
     
            /** using map center here causes some erratic behaviour*/
            //map.setCenter(val.coords);
          }
        });
      } else {
       this.buildFilterList();

       self.showStartpage(true);
       self.showCategoryPage(false);

       self.showStartpage2(false);
      }

    };
	

};





  $(document).ready(function(){
ko.applyBindings(new ViewModel())
});