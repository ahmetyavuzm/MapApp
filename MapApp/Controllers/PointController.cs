using Microsoft.AspNetCore.Mvc;

using MapApp.Models;
using MapApp.Interfaces;
using MapApp.Entities;
using MapApp.DTOs;

namespace MapApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PointController:ControllerBase , IPointController
{
    private readonly IPointService _pointService;

    public PointController(IPointService pointService)
    {
        _pointService = pointService;
    }


    [HttpGet]
    public async Task<Response<List<Point>>> GetAll()
    {
        try
        {
            List<Point> points = await _pointService.GetAll();
            if (points == null)
            {
                return Response<List<Point>>.Fail(null, "Points not found");
            }
            return Response<List<Point>>.Success(points, "Points retrieved successfully");
            //return Response<List<Point>>.Success(_pointService.GetAll(), "Points retrieved successfully");
        }
        catch (Exception ex)
        {
            return Response<List<Point>>.Error(null, ex.Message);
            //return  Response<List<Point>>.Error(null, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<Response<Point>> GetById(int id)
    {   
        try{
            var res_point = await _pointService.GetById(id);
            if (res_point == null)
            {
                return Response<Point>.Fail(null, "Point not found");
            }
            return Response<Point>.Success(res_point, "Point retrieved successfully");
        }
        catch (Exception ex)
        {
            return Response<Point>.Error(null, ex.Message);
        }
    
    }

    [HttpPost]
    public async Task<Response<Point>> Add([FromBody] PointDTO pointDto)
    {
        try
        {
            Point res_point = await _pointService.Add(pointDto);
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
    public async Task<Response<Point>> Update(int id, [FromBody] PointDTO pointDto)
    {
        try
        {
            var res_point = await _pointService.Update(id, pointDto);
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
    public async Task<Response<Point>> Delete(int id)
    {   
        try
        {
            var res_point = await _pointService.Delete(id);
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
