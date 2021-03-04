var banda = ['B10'];

var nuvem = 2;

var inicial = ('2018-01-01');
var final = ('2018-12-31');

var maringa = ee.FeatureCollection('users/gabrielsorato29/maringa_urbano');

var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
        .filterBounds(maringa)
        .filterDate(inicial,final)
        .filterMetadata('CLOUD_COVER','less_than', nuvem)
        .select(banda);
        
        
print ('L8_filtrada', L8);

var media = L8.reduce(ee.Reducer.mean());
print ('L8_media', media);

var temp = media.subtract(273.15);
print ('temp_media', temp);

Map.addLayer(maringa,{},'maringa',false);

Map.centerObject(maringa,10);

var vis = {min:0, max:40};

Map.addLayer(temp.clip(maringa),vis,'Graus_media');

Export.image.toDrive({image:temp.clip(maringa),
                     description:'GRAUSC_MEDIA_urbano',
                     folder: 'Maringa',
                     scale: 30,
                     region: maringa,});