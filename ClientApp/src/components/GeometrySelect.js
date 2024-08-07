

const GeometrySelect = ({geometry, setGeometry}) => {
    
    return (
        <div className="form-group">
            <label htmlFor="geometry">Geometry</label>
            <select 
                className="form-control" 
                id="geometry" 
                value={geometry} 
                onChange={e => setGeometry(e.target.value)}
            >
                <option value="Point">Point</option>
                <option value="Line">Line</option>
                <option value="Polygon">Polygon</option>
            </select>
        </div>
    );


};


export default GeometrySelect;