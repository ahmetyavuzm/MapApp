using Microsoft.AspNetCore.Mvc;

namespace MapApp;

[ApiController]
[Route("api/[controller]")]
public class PointController:ControllerBase , IPointController
{
    private static readonly List<Point> points = new List<Point>();
    private readonly IPointService _pointService;

    public PointController(IPointService pointService)
    {
        _pointService = pointService;
    }


    [HttpGet]
    public Response<List<Point>> GetAll()
    {
        try
        {
            return Response<List<Point>>.Success(_pointService.GetAll(), "Points retrieved successfully");
        }
        catch (Exception ex)
        {
            return  Response<List<Point>>.Error(null, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public Response<Point> Get(int id)
    {
        try
        {
            Point point = _pointService.Get(id);
            if (point == null)
            {
                return Response<Point>.Fail(null, "Point not found");
            }
            return Response<Point>.Success(point, "Point retrieved successfully");
        }
        catch (Exception ex)
        {
            return Response<Point>.Error(null, ex.Message);
        }
    }

    [HttpPost]
    public Response<Point> Add([FromBody] PointBodyView point_body)
    {
        try
        {
            Point res_point = _pointService.Add(point_body);
            if (res_point == null)
            {
                return Response<Point>.Fail(null, "Point not added");
            }
            return Response<Point>.Success(res_point, "Point added successfully");
        }
        catch (Exception ex)
        {
            return Response<Point>.Error(null, ex.Message);
        }
    }

    [HttpPost("{id}")]
    public Response<Point> Update(int id, [FromBody] PointBodyView point_body)
    {
        try
        {
            var res_point = _pointService.Update(id, point_body);
            if (res_point == null)
            {
                return Response<Point>.Fail(null, "Point not updated");
            }
            return Response<Point>.Success(res_point, "Point updated successfully");
        }
        catch (Exception ex)
        {
            return Response<Point>.Error(null, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public Response<Point> Delete(int id)
    {   
        try
        {
            var res_point = _pointService.Get(id);
            if (res_point == null)
            {
                return Response<Point>.Fail(null, "Point not found");
            }
            return Response<Point>.Success(res_point, "Point deleted successfully");
        }
        catch (Exception ex)
        {
            return Response<Point>.Error(null, ex.Message);
        }
    }

}
