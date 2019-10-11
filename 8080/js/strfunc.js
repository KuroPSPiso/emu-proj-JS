String.prototype.padLeft = function(min_size, char)
{
    var size = this.length;
    if(size >= min_size) return this;
    
    size = min_size - size;
    var tempStr = this;
    for(var index = 0; index < size; index++) tempStr = char + tempStr;
    return tempStr;
}