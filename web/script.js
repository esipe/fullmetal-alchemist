// Fonction pour la Div id=map
function init() {
	//Declaration de variable
	// Adresse map serveur
	//var addWMS = "http://192.168.1.28/?map=/map/FMA/map/map.map";
	var addWMS = "http://esipe.geonef.fr/mapserver/fullmetal-alchemist/map"; 
	var map;
	var extent = new OpenLayers.Bounds(-10.0250027,-50.0,75.6632,0.112008);
	var options = {
					controls: [
                        new OpenLayers.Control.Navigation(),
                        new OpenLayers.Control.PanZoomBar(),
                        new OpenLayers.Control.LayerSwitcher({'ascending':false}),
                        new OpenLayers.Control.Permalink(),
                        new OpenLayers.Control.ScaleLine(),
                        new OpenLayers.Control.Permalink('GeneralView'),
                        new OpenLayers.Control.MousePosition(),
                        new OpenLayers.Control.OverviewMap(),
                        new OpenLayers.Control.KeyboardDefaults()
                    ],
                	restrictedExtent: extent,
                	minResolution: "auto",
                	maxResolution: "auto",
                	maxExtent: new OpenLayers.Bounds(-17.0250027,-50.0,75.6632,0.112008)
            	};
	
	var wms = new OpenLayers.Layer.WMS(
			"OpenLayers WMS",
			addWMS,
			{layers: 'Ocean,Country,Countryname,City,Cityname,EastCity,Resembool,Rivers,Lake',format: "image/png"},
			{visibility: true}
			);

	var infoVille = new OpenLayers.Layer.WMS(
			"Information City",
			addWMS,
			{layers: 'Ville,Landmarks',transparent: "true",format: "image/png"}
			);

	var transport = new OpenLayers.Layer.WMS(
			"Transport",
			addWMS,
			{layers: 'BusLine,Railway',transparent: "true",format: "image/png"},
			{visibility: false}
			);
	map = new OpenLayers.Map('map',options);
	map.addLayers([wms,transport,infoVille]);
    info = new OpenLayers.Control.WMSGetFeatureInfo({
            url: addWMS, 
            title: 'Identify features by clicking',
            queryVisible: true,
            layers: [transport],
            eventListeners: {
                getfeatureinfo: function(event) {
                    map.addPopup(new OpenLayers.Popup.FramedCloud(
                        "chicken", 
                        map.getLonLatFromPixel(event.xy),
                        null,
                        event.text,
                        null,
                        true
                    ));
                }
            }
        });
    map.addControl(info);
    info.activate();
	map.zoomToExtent(extent,false);
}
//Fonction pour la div id = main
function switchInfoPerso()
{
	resum = document.getElementById('resum');
	legend = document.getElementById('legend');
	if (resum.style.display == 'none'){
		resum.style.display = 'block';
		legend.style.display = 'none';
		}
	else{
		resum.style.display = 'none';
		legend.style.display = 'block';
	}
}
