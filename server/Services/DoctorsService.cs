using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace server.Services;

public class DoctorsService
{
  private readonly IMongoCollection<Doctor> _doctorsCollection;

  public DoctorsService(IOptions<DatabaseSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    var database = client.GetDatabase(settings.Value.DatabaseName);

    _doctorsCollection = database.GetCollection<Doctor>("doctors");
  }

  public async Task<List<Doctor>> GetAsync() =>
    await _doctorsCollection.Find(_ => true).ToListAsync();
    
  public async Task<Doctor?> GetAsync(string id) =>
    await _doctorsCollection.Find(x => x._id == id).FirstOrDefaultAsync();

  public async Task CreateAsync(Doctor doctor) =>
    await _doctorsCollection.InsertOneAsync(doctor);

  public async Task UpdateAsync(string id, Doctor doctor) =>
    await _doctorsCollection.ReplaceOneAsync(x => x._id == id, doctor);

  public async Task RemoveAsync(string id) =>
    await _doctorsCollection.DeleteOneAsync(x => x._id == id);
}