'use strict';var e=require('path'),r=require("fs"),o=require("./common"),n=o.project_dir,t=o.DEV,i=require('../fixbug'),s=require("metro/src/transformer"),u=s.transform,a={getCacheKey:s.getCacheKey},c=new Map;function m(e){e&&'string'!=typeof e&&(e.modules||[]).forEach(function(e){c.set(e[1],e[0])})}var l={"modules":[]};function f(){if(!c.size&&l&&(m(l),l=null,c.size<1&&_())){var o=e.join(n,"bin","config","modules_sdk"),t=r.existsSync(o)?r.readFileSync(o):null;t&&(m(JSON.parse(t.toString()||"{}")),t=null)}}function _(){return!t||!a._miot_building}var p=e.join(n,"node_modules","react-native","Libraries","Image","resolveAssetSource.js"),d=/\s+module[ ]*[.][ ]*exports[ ]*[.]?\s*=?\s*/,g=/^setCustomSourceTransformer\s*=/;function v(e){if(!(e.filename!=p||e._miot_updated||(e.src||"").length<10)){e._miot_updated=!0;var r=e.src.split(d);e.src=r[0]+';\n    var _miot_process=0, _miot_trans=0; const _miot_resolve='+r[1]+'\n    \nmodule.exports=function(obj){\n        _miot_process&&_miot_process(obj);\n        return _miot_resolve(obj);\n    };\n    \n'+r.filter(function(e,r){return r>1}).map(function(e){return g.test(e)?"_miot_trans="+e.replace(g,""):"module.exports."+e}).join("\n")+'\n    \nmodule.exports.setCustomSourceTransformer=function(trans,process){\n        _miot_process = process||0;\n        _miot_trans(trans);\n    }'}}a.transform=function(r){f();var o=e.relative(n,r.filename),t=i.findContent(o);if(t)return console.log("FIXBUG",o),r.src=t.toString(),u(r);if(_()){var s=o.replace(/\\/g,"/"),m=c.get(s);if(m)return r.src=m,r.options.dev=!1,r.options.hot=!1,r.options.minify=!0,r.options.enableBabelRCLookup=!1,r.options.inlineRequires=!0,u(r)}return a._miot_building_plugin||v(r),u(r)},module.exports=a;