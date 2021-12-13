using server.Models;
using server.Services;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
  private readonly DoctorsService _doctorService;

  public DoctorsController(DoctorsService service)
    => _doctorService = service;

  [HttpGet]
  public async Task<List<Doctor>> Get() =>
    await _doctorService.GetAsync();

  [HttpGet("{id}")]
  public async Task<ActionResult<Doctor>> Get(string id)
  {
    var doctor = await _doctorService.GetAsync(id);

    if (doctor is null)
    {
      return NotFound();
    }

    return doctor;
  }

  [HttpPost]
  public async Task<IActionResult> Post(Doctor doctor)
  {
    await _doctorService.CreateAsync(doctor);

    return CreatedAtAction(nameof(Get), new { _id = doctor._id }, doctor);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Doctor newDoctor)
  {
    var doctor = await _doctorService.GetAsync(id);

    if (doctor is null)
    {
      return NotFound();
    }

    newDoctor._id = doctor._id;

    await _doctorService.UpdateAsync(id, newDoctor);

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(string id)
  {
    var doctor = await _doctorService.GetAsync(id);

    if (doctor is null)
    {
      return NotFound();
    }

    await _doctorService.RemoveAsync(doctor._id);

    return NoContent();
  }
}