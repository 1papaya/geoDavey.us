---
title: Dubai Urban Sprawl
slug: sprawl
url: /proj/dubai-sprawl/
image: ./img/sprawl.jpg
date: 2016-01-01
tags: ["grass", "gdal", "landsat", "bash"]

blurb: Skoo Buff
---

Freely available satellite imagery is a fabulous resource for use in geospatial analysis, including land cover classification. GRASS GIS -- a free, powerful suite of open source tools -- provides various methods to classify source imagery which can be used to perform land cover classification.

In pursuit of learning to use the GRASS GIS command line tools, I decided to try some land use classification with satellite imagery from Dubai. Dubai is particularly interesting because it has undergone a massive urban sprawl in the last few decades, plus the construction of various artificial islands in the ocean.

The land cover classification was performed in many steps, all via command line:

```bash
#!/bin/bash

# loop thru .TIFs in each folder
for tiff in ${folder}*.TIF; do
    # capture which channel (ex. 1, 2, 3...)
    channel=${BASH_REMATCH[1]}

    # import the tiff, output raster (ex. 1999_09.1)
    r.in.gdal -e input=$tiff output=$year.$channel

    # builds a string like 1999_09.1@PERMANENT,
    import_string=$import_string$year.$channel@$mapset,
done

# create image group with imported rasters (e.x 1999_09)
i.group group=$year subgroup=$year input=$import_string
i.target -c group=$year

# import classifier vector (e.x classify_1999_09)
v.in.ogr -o --overwrite \
    dsn="classify/classify.shp" \
    output=classify_$year \
    min_area=0.0001 \
    type=boundary snap=-1

# set the region of the vector equal
# to that of the input raster group
g.region --overwrite \
    -p \
    zoom=$year.1

# convert the vector to a raster layer
v.to.rast --overwrite \
    in=classify_$year \
    output=classify_$year \
    type=point,line,area \
    use=attr \
    column=id

# compute spectral signature
i.gensig group=$year \
    subgroup=$year \
    sig="classify_$year.sig" \
    training=classify_$year

# compute maximum-likelihood classification
# save output raster (e.x. 1999_09.out)
i.maxlik --overwrite \
    group=$year \
    subgroup=$year \
    sig="classify_$year.sig" \ 
    class="$year.out"

# save area info about output raster
r.stats -na input="$year.out" output="info/$year.txt"

# smoothing
r.neighbors input="$year.out" output="$year.out" \
    method=mode \
    size=3

# save raster output
r.out.gdal input="$year.out" format=GTiff nodata=0 \ 
output="results/result_$year.tif"
```

# Test 1

1. Download source data

- Landsat 7 was chosen because it has been capturing imagery for a long time (since 1999). Various relatively cloud-free source images were downloaded from 1999 to 2014 with the imagery bands separated.

2. Draw imagery classification polygons

- To understand the urban sprawl of Dubai the imagery was classified into various parts and then the algorithm trained to recognize those parts. Ultimately the scene was divided into four categories (0=null, 1=urban, 2=undeveloped, 3=water)

3. Compute spectral signature

- With the classification polygon drawn we compute the spectral signature of each class, for each of the source images.

4. Compute maximum likelihood estimation

- Using the computed spectral signature of each class, the rest of the pixels are classified based upon maximum likelihood.

5. Output

- The output rasters are smoothed and outputted as TIF, and then converted to GIF for a final animated image showing land use change over time.

By classifying the land cover for satellite images gathered over time we are able to understand the rate of urban sprawl occuring in the city.

If you're curious, check out the [source data and code over on GitHub](https://github.com/1papaya/dubai-sprawl)!
