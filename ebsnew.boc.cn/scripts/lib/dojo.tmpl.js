/*! BUILD: 2014-04-24 */
!function(a){function b(b,c,d,e){var f={data:e||(c?c.data:{}),_wrap:c?c._wrap:null,tmpl:null,parent:c||null,nodes:[],calls:j,nest:k,wrap:l,html:m,update:n};return b&&a.extend(f,b,{nodes:[],parent:c}),d&&(f.tmpl=d,f._ctnt=f._ctnt||f.tmpl(a,f),f.key=++v,(x.length?t:s)[v]=f),f}function c(b,e,f){var g,h=f?a.map(f,function(a){return"string"==typeof a?b.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+q+'="'+b.key+'" $2'):a:c(a,b,a._ctnt)}):b;return e?h:(1==h.length&&h[0].join&&(h=h[0]),h=h.join(""),h.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(b,c,e,f){g=a(e).get(),i(g),c&&(g=d(c).concat(g)),f&&(g=g.concat(d(f)))}),g?g:d(h))}function d(b){var c=document.createElement("div");return c.innerHTML=b,a.makeArray(c.childNodes)}function e(b){return new Function("$","$item","var $=$,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(b,c,d,e,f,h,i){var j,k,l,m=a.tmpl.tag[d];if(!m)throw"Template command not found: "+d;return j=m._default||[],h&&!/\w$/.test(f)&&(f+=h,h=""),f?(f=g(f),i=i?","+g(i)+")":h?")":"",k=h?f.indexOf(".")>-1?f+h:"("+f+").call($data"+i:f,l=h?k:"(typeof("+f+")==='function'?("+f+").call($item):("+f+"))"):l=k=j.$1||"null",e=g(e),"');"+m[c?"close":"open"].split("$notnull_1").join(f?"typeof("+f+")!=='undefined' && ("+f+")!=null":"true").split("$1a").join(l).split("$1").join(k).split("$2").join(e?e.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(a,b,c,d){return d=d?","+d+")":c?")":"",d?"("+b+").call($item"+d:a}):j.$2||"")+"_.push('"})+"');}return _;")}function f(b,d){b._wrap=c(b,!0,a.isArray(d)?d:[r.test(d)?d:a(d).html()]).join("")}function g(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function h(a){var b=document.createElement("div");return b.appendChild(a.cloneNode(!0)),b.innerHTML}function i(c){function d(c){function d(a){a+=j,g=k[a]=k[a]||b(g,s[g.parent.key+j]||g.parent,null,!0)}var e,f,g,h,i=c;if(h=c.getAttribute(q)){for(;i.parentNode&&1===(i=i.parentNode).nodeType&&!(e=i.getAttribute(q)););e!==h&&(i=i.parentNode?11===i.nodeType?0:i.getAttribute(q)||0:0,(g=s[h])||(g=t[h],g=b(g,s[i]||t[i],null,!0),g.key=++v,s[v]=g),w&&d(h)),c.removeAttribute(q)}else w&&(g=a.data(c,"tmplItem"))&&(d(g.key),s[g.key]=g,i=a.data(c.parentNode,"tmplItem"),i=i?i.key:0);if(g){for(f=g;f&&f.key!=i&&0!=f.key;)f.nodes.push(c),f=f.parent;delete g._ctnt,delete g._wrap,a.data(c,"tmplItem",g)}}var e,f,g,h,i,j="_"+w,k={};for(g=0,h=c.length;h>g;g++)if(1===(e=c[g]).nodeType){for(f=e.getElementsByTagName("*"),i=f.length-1;i>=0;i--)d(f[i]);d(e)}}function j(a,b,c,d){return a?(x.push({_:a,tmpl:b,item:this,data:c,options:d}),void 0):x.pop()}function k(b,c,d){return a.tmpl(a.template(b),c,d,this)}function l(b,c){var d=b.options||{};return d.wrapped=c,a.tmpl(a.template(b.tmpl),b.data,d,b.item)}function m(b,c){var d=this._wrap;return a.map(a(a.isArray(d)?d.join(""):d).filter(b||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||h(a)})}function n(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]),a(b).remove()}var o,p=a.fn.domManip,q="_tmplitem",r=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,s={},t={},u={key:0,data:{}},v=0,w=0,x=[];a.each({insertBefore:"before"},function(b,c){a.fn[b]=function(b){var d;return o=s||{},this.targets[c](b),d=o,o=null,a.tmpl.complete(d),this}}),a.fn.extend({tmpl:function(b,c,d){return a.tmpl(this.get(0),b,c,d)},tmplItem:function(){return a.tmplItem(this.get(0))},tmplElement:function(){return a.tmplElement(this.get(0))},template:function(b){return a.template(b,this.get(0))},domManip:function(b,c,d){if(b[0]&&b[0].nodeType){for(var e,f=a.makeArray(arguments),g=b.length,h=0;g>h&&!(e=a.data(b[h++],"tmplItem")););g>1&&(f[0]=[a.makeArray(b)]),e&&w&&(f[2]=function(b){a.tmpl.afterManip(this,b,d)}),p.apply(this,f)}else p.apply(this,arguments);return w=0,o||a.tmpl.complete(s),this}}),a.extend({tmpl:function(d,e,g,h){var i,j=!h;if(j)h=u,"function"!=typeof d&&(d=a.template[d]||a.template(null,d)),t={};else if(!d)return d=h.tmpl,s[h.key]=h,h.nodes=[],h.wrapped&&f(h,h.wrapped),a(c(h,null,h.tmpl(a,h)));return d?("function"==typeof e&&(e=e.call(h||{})),g&&g.wrapped&&f(g,g.wrapped),i=a.isArray(e)?a.map(e,function(a){return a?b(g,h,d,a):null}):[b(g,h,d,e)],j?a(c(h,null,i)):i):[]},tmplItem:function(b){var c;for(b instanceof a&&(b=b[0]);b&&1===b.nodeType&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode););return c||u},tmplElement:function(b){for(b instanceof a&&(b=b[0]);b&&1===b.nodeType&&!a.data(b,"tmplItem")&&(b=b.parentNode););return b},template:function(b,c){if(c){if("string"==typeof c?c=e(c):c instanceof a&&(c=c[0]||{}),c.nodeType){var d=11==c.nodeType?c.childNodes[0].innerHTML:c.innerHTML;c=a.data(c,"tmpl",e(d))}return"string"==typeof b?a.template[b]=c:c}return b?"string"!=typeof b?a.template(null,b):a.template[b]||a.template(null,r.test(b)?b:a(b)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}}),a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){s={}},afterManip:function(b,c,d){var e=11===c.nodeType?a.makeArray(c.childNodes):1===c.nodeType?[c]:[];d.call(b,c),i(e),w++}})}($);