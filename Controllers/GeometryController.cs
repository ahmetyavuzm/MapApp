using MapApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MapApp.Entities;
using MapApp.Models;
using MapApp.DTOs;

namespace MapApp.Controllers;


[ApiController]
[Route("[controller]")]
public class GeometryController : ControllerBase
{
    private readonly IGeometryService geometryService;
    public GeometryController(IGeometryService geometryService)
    {
        this.geometryService = geometryService;
    }

    [HttpGet]
    public async Task<Response<List<GeometryGetDto>?>> GetUserGeometries([FromQuery] string userId)
    {
        try
        {
            List<Geometry>? geometries = await this.geometryService.GetUserGeometries(userId);

            List<GeometryGetDto> response = geometries.Select(g => new GeometryGetDto(g)).ToList();


            return Response<List<GeometryGetDto>?>.Success(response, "Geometries Retrieved Successfully");
        }
        catch (Exception e)
        {
            return Response<List<GeometryGetDto>?>.Error(null, e.Message);
        }
    }


    [HttpGet("{id}")]
    public async Task<Response<GeometryGetDto?>> GetById(int id)
    {
        try
        {
            Geometry? geometry = await this.geometryService.GetById(id);

            if (geometry is null)
            {
                return Response<GeometryGetDto?>.Fail(null, "Geometry not found");
            }

            return Response<GeometryGetDto?>.Success(new GeometryGetDto(geometry), "Geometry Retrieved Successfully");
        }
        catch (Exception e)
        {
            return Response<GeometryGetDto?>.Error(null, e.Message);
        }
    }


    [HttpPost]
    public async Task<Response<GeometryGetDto?>> Create([FromBody] GeometrySetDto geometry)
    {
        try
        {
            Geometry? createdGeometry = await this.geometryService.Create(new Geometry(geometry));

            if (createdGeometry is null)
            {
                return Response<GeometryGetDto?>.Fail(null, "Failed to create geometry");
            }

            return Response<GeometryGetDto?>.Success(new GeometryGetDto(createdGeometry), "Geometry Created Successfully");
        }
        catch (Exception e)
        {
            return Response<GeometryGetDto?>.Error(null, e.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<Response<GeometryGetDto?>> Update(int id, [FromBody] GeometrySetDto geometry)
    {
        try
        {
            Geometry? updatedGeometry = await this.geometryService.Update(id, new Geometry(geometry));

            if (updatedGeometry is null)
            {
                return Response<GeometryGetDto?>.Fail(null, "Failed to update geometry");
            }

            return Response<GeometryGetDto?>.Success(new GeometryGetDto(updatedGeometry), "Geometry Updated Successfully");
        }
        catch (Exception e)
        {
            return Response<GeometryGetDto?>.Error(null, e.Message);
        }
    }


    [HttpDelete("{id}")]
    public async Task<Response<GeometryGetDto?>> Delete(int id)
    {
        try
        {
            Geometry? deletedGeometry = await this.geometryService.Delete(id);

            if (deletedGeometry is null)
            {
                return Response<GeometryGetDto?>.Fail(null, "Failed to delete geometry");
            }

            return Response<GeometryGetDto?>.Success(new GeometryGetDto(deletedGeometry), "Geometry Deleted Successfully");
        }
        catch (Exception e)
        {
            return Response<GeometryGetDto?>.Error(null, e.Message);
        }
    }


}
