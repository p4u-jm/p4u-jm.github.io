const parseCSV = (text) => {
    const lines = text.split('\n');
    const output = [];
    
    lines.forEach(line => {
        line = line.trim();
        
        if (line.length === 0) return;
        
        const skip_indexes = {};
        const columns = line.split(',');
        
        output.push(columns.reduce((result, item, index) => {
            if (skip_indexes[index]) return result;
            
            if (item.startsWith('"') && !item.endsWith('"')) {
                while (!columns[index + 1].endsWith('"')) {
                    index++;
                    item += `,${columns[index]}`;
                    skip_indexes[index] = true;
                }
                
                index++;
                skip_indexes[index] = true;
                item += `,${columns[index]}`;
            }
            
            result.push(item);
            return result;
        }, []));
    });
    
    return output;
};