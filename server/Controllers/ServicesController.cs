using server.Models;
using server.Services;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
  private readonly ServicesService _serviceService;

  public ServicesController(ServicesService service)
    => _serviceService = service;

  [HttpGet]
  public async Task<List<Service>> Get() =>
    await _serviceService.GetAsync();

  [HttpGet("{id}")]
  public async Task<ActionResult<Service>> Get(string id)
  {
    var service = await _serviceService.GetAsync(id);

    if (service is null)
    {
      return NotFound();
    }

    return service;
  }

  [HttpPost]
  public async Task<IActionResult> Post(Service service)
  {
    await _serviceService.CreateAsync(service);

    return CreatedAtAction(nameof(Get), new { _id = service._id }, service);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Service newService)
  {
    var service = await _serviceService.GetAsync(id);

    if (service is null)
    {
      return NotFound();
    }

    newService._id = service._id;

    await _serviceService.UpdateAsync(id, newService);

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(string id)
  {
    var service = await _serviceService.GetAsync(id);

    if (service is null)
    {
      return NotFound();
    }

    await _serviceService.RemoveAsync(service._id);

    return NoContent();
  }
}