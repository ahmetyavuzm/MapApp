namespace MapApp.Models;

public class Response<T>
{

    public T Data { get; set; }
    public string Message { get; set; }
    public StatusCode StatusCode { get; set; }

    public bool IsSuccess {get; set;}

    private Response(T data, string message, StatusCode statusCode, bool isSuccess)
    {
        Data = data;
        Message = message;
        StatusCode = statusCode;
        IsSuccess = isSuccess;
    }


    public static Response<T> Success(T data, string message)
    {
        return new Response<T>(data, message, StatusCode.Success, true);
    }

    public static Response<T> Fail(T data, string message)
    {
        return new Response<T>(data, message, StatusCode.Fail, true);
    }
    public static Response<T> Error(T data, string message)
    {
        return new Response<T>(data, message, StatusCode.Error, false);
    }




}