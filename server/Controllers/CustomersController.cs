using server.Models;
using server.Services;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
  private readonly CustomersService _customersService;

  public CustomersController(CustomersService service)
    => _customersService = service;

  [HttpGet]
  public async Task<List<Customer>> Get() =>
    await _customersService.GetAsync();

  [HttpGet("{id}")]
  public async Task<ActionResult<Customer>> Get(string id)
  {
    var customer = await _customersService.GetAsync(id);

    if (customer is null)
    {
      return NotFound();
    }

    return customer;
  }

  [HttpPost]
  public async Task<IActionResult> Post(Customer customer)
  {
    await _customersService.CreateAsync(customer);

    return CreatedAtAction(nameof(Get), new { _id = customer._id }, customer);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Customer newCustomer)
  {
    var customer = await _customersService.GetAsync(id);

    if (customer is null)
    {
      return NotFound();
    }

    newCustomer._id = customer._id;

    await _customersService.UpdateAsync(id, newCustomer);

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(string id)
  {
    var customer = await _customersService.GetAsync(id);

    if (customer is null)
    {
      return NotFound();
    }

    await _customersService.RemoveAsync(customer._id);

    return NoContent();
  }

  [HttpGet("{date:datetime}")]
  public async Task<List<Customer>> FindByDate(DateTime date)
    => await _customersService.GetAsync(date);
}