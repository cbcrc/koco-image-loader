# koco-image-loader
This image loader component allows for placing a default image while it checks for the status of the image you're trying to display. If the image fails to load in the browser the default image stays in place. If it successfully loads the default image is replaced by the loaded image.


#Getting started

## Install bower component
```
  bower install koco-image-loader
```

## Setup with [koco](https://www.npmjs.com/package/generator-koco)
``` javascript
  // register the component
  koUtilities.registerComponent('image-loader', {
    basePath: 'bower_components/koco-image-loader/src'
  });
```
``` less
  // style.less
  @import "../bower_components/koco-image-loader/src/image-loader.less";
```

## Include image-loader tag with params
``` html
  <!-- 
    params : 
      - width = 256
      - height = 256
      - src = {image src}
      - defaultImgClassName = 'default-img'
      - errorOptions = {
          className : 'default-error',
          display : true
        }
  -->
  <image-loader params="width:100, height:100, src= '{image url}'">
    
  </image-loader>
``` 

## Overriding default css
This is done by simply extending **koco-image-loader**

``` less
  // overriding default style
  .custom-style:extend(koco-image-loader) {
    // insert custom styling here
    
    &.custom-lazy-default-img{
      // insert custom styling here
    }  
    
    &.custom-error{
      // insert custom styling here
    }
  }
```

Don't forget to pass the appropriate parameters to image-loader
``` html
  <image-loader 
    class="custom-style" 
    params="src: '{image url}', defaultImgClassName: 'custom-lazy-default-img', errorOptions: {className :  'custom-error'} ">
    
  </image-loader>
```


