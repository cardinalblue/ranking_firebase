module.exports = {
    /* Returns true if the inputted object is a JavaScript array */
    isArray(obj) {
        return (Object.prototype.toString.call(obj) === "[object Array]");
    },
    
    /* Converts a Firebase object to a JavaScript array */
    toArray(obj) {
        var out = [];
        if (obj) {
            if (this.isArray(obj)) {
                out = obj;
            } else if (typeof(obj) === "object") {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        var v = obj[key];
                        v.key = key;
                        out.push(v);
                    }
                }
            }
        }
        return out;
    }
};
