using MapApp.Interfaces;
using Newtonsoft.Json;


namespace MapApp.Entities;

public abstract class BaseGeometry:IEntity
{
    public int? GroupId {get;set;}
    public Group Group {get;set;}
    public int Id { get; set;}
    public string Type {get;set;}

    public string Properties {get;set;}

    public string UserId {get;set;}

    public string Stringify(object? obj){
        if (obj == null)
        {
            return "";
        }
        var jsonString = JsonConvert.SerializeObject(obj, Formatting.Indented);
        return jsonString;
    }

    public object? Parse(string jsonString){
        if (jsonString == "")
        {
            return null;
        }
        var obj = JsonConvert.DeserializeObject(jsonString);
        return obj;
    }
}