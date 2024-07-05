using MapApp;
using MapApp.Entities;
using MapApp.Models;
using MapApp.DTOs;

namespace MapApp.Interfaces;

public interface IPointController
{
    Task<Response<List<Point>>> GetAll();
    Task<Response<Point>> GetById(int id);
    Task<Response<Point>> Add(PointDTO pointDto);
    Task<Response<Point>> Update(int id, PointDTO pointDto);
    Task<Response<Point>> Delete(int id);
}
