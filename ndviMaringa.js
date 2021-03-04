var nuvem = 10;

var inicial = ('2010-01-01');

var final = ('2010-12-31');

var land5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
            .filterBounds(maringa)
            .filterDate(inicial,final)
            .filterMetadata('CLOUD_COVER', 'less_than', nuvem);
            
print ('land5', land5)

Map.addLayer (maringa,{},'maringa_shape',false);
Map.centerObject (maringa,10);

var media = land5.reduce(ee.Reducer.mean());
var median = land5.reduce(ee.Reducer.median());

print ('media',media); 
print ('median',median);

var vis = {bands:['B3_mean','B2_mean','B1_mean'],
          min: 0,
          max:0.2};
          
Map.addLayer (media.clip(maringa), vis, 'Media_visivel');

///////////////////////////////// NDVI  ///////////////////////////////////////////////

var ndvi_mediana = median.normalizedDifference(['B4_median','B3_median']);
var ndvi_media = media.normalizedDifference(['B4_mean','B3_mean']);

var visndvi = {min:0, max:0.8};

Map.addLayer(ndvi_mediana.clip(maringa),visndvi,'ndvi_mediana');

Export.image.toDrive({image:ndvi_mediana.clip(maringa),
                     description:'NDVI_MEDIANA2010',
                     folder: 'GEE',
                     scale: 30,
                     region: maringa,});