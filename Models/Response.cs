namespace MapApp.Models;
using MapApp.Enums;

public class Response<T>
{

    public T Data { get; set; }
    public string Message { get; set; }
    public int StatusCode { get; set; }

    public bool IsSuccess {get; set;}

    private Response(T data, string message, StatusCode statusCode, bool isSuccess)
    {
        Data = data;
        Message = message;
        StatusCode = (int)statusCode;
        IsSuccess = isSuccess;
    }


    public static Response<T> Success(T data, string message)
    {
        return new Response<T>(data, message, Enums.StatusCode.Success, true);
    }

    public static Response<T> Fail(T data, string message)
    {
        
        
        return new Response<T>(data, message, Enums.StatusCode.Fail, true);
    }
    public static Response<T> Error(T data, string message)
    {
        return new Response<T>(data, message,Enums.StatusCode.Error, false);
    }




}