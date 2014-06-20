function assert(expression, message)
{
	if(!expression)
	{
		throw message;
	}
}

function TreeNode(v, p)
{
	var that = this;
	this.value = v;	
	this.children = [];
	this.parent = p;

	if(v != null)
	{
		this.invariantValue = v.toUpperCase();
	}
	
	this.insertWord = function(val) {	
		assert((typeof val) === 'string', 'Value is not string');	
		assert(val.length > 0, 'Value is too short');		
				
		var firstChar = val[0];
		var substring = val.substring(1);		
		
		var foundenChild = null;
		for(var key in that.children)
		{			
			var child = that.children[key];
			if(child.value === firstChar)
			{
				foundenChild = child;
			}
		}
		if(foundenChild == null)
		{			
			var newTreeNode = new TreeNode(firstChar, that);
			that.children.push( newTreeNode );
			
			if(substring !== '')
			{
				newTreeNode.insertWord(substring);							
			}
		}
		else
		{			
			if(substring != '')
			{
				foundenChild.insertWord(substring);
			}			
		}
	}	
}

function Tree()
{
	var that = this;

	var rootNode = new TreeNode(null);

	this.add = function( word )
	{
		rootNode.insertWord( word );
	}	
	
	this.dbg = function()
	{
		that.it(rootNode);
	}
	
	this.it = function(node)
	{		
		console.log(node);			
		for(var key in node.children)
		{			
			var child = node.children[key];
			that.it(child);				
		}
	}
}

function IncrementalSearch() {
	
	var that = this;	
	
	this.dictionary = new Dictionary(that._dictionary_changed);
	
	this._inputElement = null;
	
	this._inputElement_onkeydown = function( e ) {
		console.log(e);
	}
	
	this._dictionary_changed = function ( e ) {
	}
}
IncrementalSearch.prototype.__defineGetter__(
	'inputElement',
	function() {
		return this._inputElement; 
	});
IncrementalSearch.prototype.__defineSetter__(
	'inputElement',
	function( v ) { 	    
		this._inputElement = v; 
		this._inputElement.onkeydown = this._inputElement_onkeydown;
		
		var parent = this._inputElement.parentNode;
		
		var datalist = document.createElement('datalist');
		datalist.setAttribute('name', 'datalistName');
		
		parent.appendChild(datalist);
		
		this._inputElement.setAttribute('list', 'datalistName');
	});

function Dictionary( dictionaryChangedCallback ) {    

	var that = this;

	var _dictionaryChangedCallback = dictionaryChangedCallback;

    var _dictionary = [];
	
    this.add = function( word ) {
		_dictionary.push(word);
		console.log(that._dictionaryChangedCallback);		
	}
	
	this.find = function() {
		return _dictionary;
	}
}
