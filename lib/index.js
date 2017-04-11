!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var r in i)("object"==typeof exports?exports:e)[r]=i[r]}}(this,function(){return function(e){function t(r){if(i[r])return i[r].exports;var a=i[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.pick=function(e,t){var i={};return t.forEach(function(t){i[t]=e[t]}),i},t.difference=function(e,t){var i=[];return e.forEach(function(e){t.indexOf(e)<0&&i.push(e)}),i}},function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),o=i(0),s={notDefinedKey:function(e){return"Key '"+e+"' is not defined in schema"},modelIsUndefined:function(){return"Validated model is undefined"},validateRequired:function(e){return"Field '"+e+"' is required"},validateString:function(e){return"Field '"+e+"' is not a String"},validateNumber:function(e){return"Field '"+e+"' is not a Number"},validateObject:function(e){return"Field '"+e+"' is not a Object"},validateArray:function(e){return"Field '"+e+"' is not a Array"},validateBoolean:function(e){return"Field '"+e+"' is not a Boolean"},validateDate:function(e){return"Field '"+e+"' is not a Date"}},u=function(){function e(t,i){r(this,e),this.schema=t,this.errors={},this.promises=[],this.messages=i||s,this.validateTypeString=this.validateTypeString.bind(this),this.validateTypeNumber=this.validateTypeNumber.bind(this),this.validateTypeObject=this.validateTypeObject.bind(this),this.validateTypeArray=this.validateTypeArray.bind(this),this.validateTypeBoolean=this.validateTypeBoolean.bind(this),this.validateTypeDate=this.validateTypeDate.bind(this),this.validateTypeSchema=this.validateTypeSchema.bind(this),this.typesValidators={String:this.validateTypeString,Number:this.validateTypeNumber,Object:this.validateTypeObject,Array:this.validateTypeArray,Boolean:this.validateTypeBoolean,Date:this.validateTypeDate}}return n(e,[{key:"getDefaultValueForModel",value:function(e,t){return t?[e]:e}},{key:"getDefaultValues",value:function(){var t=this,i=Object.keys(this.schema),r={};return i.forEach(function(i){var a=t.getField(i),n=Array.isArray(a.type),o=n?a.type[0]:a.type;return a.defaultValue?void(r[i]=t.getDefaultValueForModel(a.defaultValue,n)):a.options?void(r[i]=t.getDefaultValueForModel(a.options[0].value?a.options[0].value:a.options[0],n)):o instanceof e?void(r[i]=t.getDefaultValueForModel(o.getDefaultValues(),n)):"Number"===o.name?void(r[i]=t.getDefaultValueForModel(NaN,n)):"Boolean"===o.name?void(r[i]=t.getDefaultValueForModel(!1,n)):"Object"===o.name?void(r[i]=t.getDefaultValueForModel({},n)):void(r[i]=t.getDefaultValueForModel("",n))}),r}},{key:"getField",value:function(e){return this.schema[e]}},{key:"getFields",value:function(){return this.schema}},{key:"validate",value:function(e){var t=this;return this.errors={},this.promises=[],this.checkModel(e)&&(this.checkKeysDiff(e),this.checkTypesAndValidators(e)),this.promises.length>0?new Promise(function(e){Promise.all(t.promises).then(e(t.errors))}):this.errors}},{key:"setError",value:function(e,t,i){return this.errors[e]||(this.errors[e]=[]),i>-1?void(this.errors[e][i]=t):void this.errors[e].push(t)}},{key:"checkModel",value:function(e){return!!e||(this.setError("model",this.messages.modelIsUndefined()),!1)}},{key:"checkKeysDiff",value:function(e){var t=this,i=Object.keys(e),r=Object.keys(this.schema),a=(0,o.difference)(i,r);a.length>0&&a.forEach(function(e){t.setError(e,t.messages.notDefinedKey(e))})}},{key:"checkTypesAndValidators",value:function(e){var t=this,i=Object.keys(this.schema),r=(0,o.pick)(e,i);i.forEach(function(e){var i=r[e],a=t.schema[e],n=Array.isArray(a.type),o=n?a.type[0]:a.type;n&&t.validateType(Array,i)?i.forEach(function(i,r){t.validateType(o,i,e,r)}):t.validateType(o,i,e),t.validateRequired(a,i,e),t.validateCustomValidators({validators:a.validators,value:i,fieldSchema:a,validatedObject:r,key:e})})}},{key:"validateCustomValidators",value:function(e){var t=this,i=e.validators,r=e.value,a=e.fieldSchema,n=e.validatedObject,o=e.key;i&&i.forEach(function(e){var i=e.validator,s=e.errorMessage,u=i(r,a,n);return u instanceof Promise?void t.promises.push(u.then(function(e){e||t.setError(o,s)})):void(u||t.setError(o,s))})}},{key:"validateRequired",value:function(e,t,i){!e.required||t&&0!==t.length||this.setError(i,this.messages.validateRequired(i))}},{key:"validateType",value:function(t,i,r,a){if("function"==typeof this.typesValidators[t.name])return this.typesValidators[t.name](i,r,t,a);if(t instanceof e)return this.validateTypeSchema(i,r,t,a);throw new Error("Unrecognized type "+t.name)}},{key:"validateTypeString",value:function(e,t,i){return"string"==typeof e||(this.setError(t,this.messages.validateString(t),i),!1)}},{key:"validateTypeNumber",value:function(e,t,i){return"number"==typeof e||(this.setError(t,this.messages.validateNumber(t),i),!1)}},{key:"validateTypeObject",value:function(e,t,i){return"object"===("undefined"==typeof e?"undefined":a(e))&&!Array.isArray(e)||(this.setError(t,this.messages.validateObject(t),i),!1)}},{key:"validateTypeArray",value:function(e,t,i){return!!Array.isArray(e)||(this.setError(t,this.messages.validateArray(t),i),!1)}},{key:"validateTypeBoolean",value:function(e,t,i){return"boolean"==typeof e||(this.setError(t,this.messages.validateBoolean(t),i),!1)}},{key:"validateTypeDate",value:function(e,t,i){return e instanceof Date||(this.setError(t,this.messages.validateDate(t),i),!1)}},{key:"validateTypeSchema",value:function(e,t,i,r){var a=i.validate(e),n=Object.keys(a);return 0===n.length||(this.setError(t,a,r),!1)}}]),e}();t.default=u}])});