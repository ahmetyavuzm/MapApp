using Microsoft.AspNetCore.Mvc;
using MapApp.Entities;
using MapApp.Interfaces;
using MapApp.Models;
using MapApp.DTOs;

namespace MapApp.Controllers;

[ApiController]
[Route("[controller]")]
public class GroupController:ControllerBase
{
    private readonly IGroupService groupService;

    public GroupController(IGroupService groupService)
    {
        this.groupService = groupService;
    }

    [HttpGet("layers/{userId}")]
    public async Task<Response<List<GroupGetDto>>> GetUserLayers(string userId)
    {
        try
        {
            List<Group> groups = await this.groupService.GetUserLayers(userId);
            List<GroupGetDto> groupGetDtos = new List<GroupGetDto>();
            foreach (Group group in groups)
            {
                groupGetDtos.Add(new GroupGetDto(group));
            }
            return Response<List<GroupGetDto>>.Success(groupGetDtos, "Groups Retrieved Successfully");
        }
        catch (Exception e)
        {
            return Response<List<GroupGetDto>>.Error(null, e.Message);
        }
    }


    [HttpGet("{id}")]
    public async Task<Response<GroupGetDto?>> GetById(int id)
    {
        try
        {
            Group? group = await this.groupService.GetById(id);
            if (group == null)
            {
                return Response<GroupGetDto?>.Fail(null, "Group not found");
            }



            return Response<GroupGetDto?>.Success(new GroupGetDto(group), "Group Retrieved Successfully");
        }
        catch (Exception e)
        {
            return Response<GroupGetDto?>.Error(null, e.Message);
        }
    }

    [HttpPost("add")]
    public async Task<Response<GroupGetDto?>> CreateGroup(GroupSetDto dto)
    {
        try
        {
            Group? createdGroup = await this.groupService.Create(new Group(dto));
            if (createdGroup is null)
            {
                return Response<GroupGetDto?>.Fail(null, "Failed to create group");
            }
        
            return Response<GroupGetDto?>.Success(new GroupGetDto(createdGroup), "Group Created Successfully");
        }
        catch (Exception e)
        {
            return Response<GroupGetDto?>.Error(null, e.Message);
        }
    }

    [HttpPut("update/{id}")]

    public async Task<Response<GroupGetDto?>> UpdateGroup(int id, GroupSetDto dto)
    {
        try
        {
            Group? updatedGroup = await this.groupService.Update(id, new Group(dto));
            if (updatedGroup is null)
            {
                return Response<GroupGetDto?>.Fail(null, "Failed to update group");
            }
            return Response<GroupGetDto?>.Success(new GroupGetDto(updatedGroup), "Group Updated Successfully");
        }
        catch (Exception e)
        {
            return Response<GroupGetDto?>.Error(null, e.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<Response<GroupGetDto?>> DeleteGroup(int id)
    {
        try
        {
            Group? deletedGroup = await this.groupService.Delete(id);
            if (deletedGroup is null)
            {
                return Response<GroupGetDto?>.Fail(null, "Failed to delete group");
            }
            return Response<GroupGetDto?>.Success(new GroupGetDto(deletedGroup), "Group Deleted Successfully");
        }
        catch (Exception e)
        {
            return Response<GroupGetDto?>.Error(null, e.Message);
        }
    }


}
