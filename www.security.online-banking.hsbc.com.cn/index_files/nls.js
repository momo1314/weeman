define([
	"dojo/query",
	"dojo/_base/lang",
	"dojo/dom-attr",
    "dojo/_base/array",
    "dojo/dom-construct"
], function(query, lang, domAttr, array, domConstruct) {
	return {
		//selectors : ['data-nlsid', 'data-nlsid-value'],
		scan: function(opts) {
			//Default options
			opts = lang.mixin({
				selector: '[data-nlsid]',
				rootNode: document.documentElement
			}, opts);

			return query(opts.selector, opts.rootNode);
		},
		
		scanString: function(opts) {
			//Default options
			opts = lang.mixin({
				selector: '[data-nlsid-value]',
				rootNode: document.documentElement
			}, opts);

			return query(opts.selector, opts.rootNode);
		},

		replace: function(opts) {
			if('nls' in opts === false) { throw new Error('No nls data provided'); }

			//If nodes are provided, use them. If not then do a scan. If selector/rootNode specified in opts use that in scan
			var nodes = ('nodes' in opts) ? opts.nodes : this.scan(opts);

			//If the provided nodes are not a NodeList then convert them to a NodeList
			if(nodes instanceof Array === false) { nodes = new query.NodeList(nodes); }
			
			var self = this;
			//Do replace
			nodes.forEach(function(node) {
				
				
				
				var nlsId = domAttr.get(node, 'data-nlsid'),
					newText = lang.getObject(nlsId, false, opts.nls),
                    nodeName = node.nodeName;

					
                if (nodeName === 'INPUT'){
                    node.value = newText;
					

					
					// if(newText==undefined){
						
					// var nlsIdParam = node.attributes[7].nodeValue;
					// alert(nlsIdParam);
					// //newText = lang.getObject(nlsId, false, opts.nls);
						
						
					// }
					// //var dataProps = node.attributes[7].nodeValue;
					// //var missingMsg = dataProps + " , missingMessage: '" + newText + "'";
					// //node.attributes[7].nodeValue = missingMsg;
					// //console.log(node.attributes[7].nodeValue);
                } else if (nodeName === 'TITLE'){
                    document.title = newText;
                } else{
                    var fragNode = domConstruct.toDom(newText);

                    domConstruct.place(fragNode, node, 'only');
                }
				
				//If nodes are provided, use them. If not then do a scan. If selector/rootNode specified in opts use that in scan
				nodes = ('nodes' in opts) ? opts.nodes : self.scanString(opts);
				//If the provided nodes are not a NodeList then convert them to a NodeList
				if(nodes instanceof Array === false) { nodes = new query.NodeList(nodes); }
				
				//Do replace
				nodes.forEach(function(node) {
					
					var nlsId = domAttr.get(node, 'data-nlsid-value');
					
					var node_data_dojo_props = domAttr.get(node, 'data-dojo-props');
					var attributes = node.attributes;
					var attrValue = "";
					
					var nlsIdArray = nlsId.split(",");
					
					nlsIdArray.forEach(function(id){
						var	newText = lang.getObject(id, false, opts.nls),
							valueid = id.split(".");	
						for (var i=0; i<attributes.length; i++) {
							if (['data-nlsid-value','data-nlsid','data-dojo-props'].indexOf(attributes[i].name) < 0) {
								if (newText ==undefined) {
									newText = valueid[1].split('_')[1];
								}
								attrValue = attributes[i].value.replace(valueid[1], newText);
								domAttr.set(node, attributes[i].name, attrValue);
							}
						}
						node_data_dojo_props = node_data_dojo_props.replace(valueid[1],newText);
						
					});
					
					domAttr.set(node, 'data-dojo-props', node_data_dojo_props);
					
					
				});
            });			
			
		}
		
	};
});