using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class Doctor
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? _id { get; set; }

  public string? img { get; set; }

  public string? spec { get; set; }

  public string? name { get; set; }

  public string? desc { get; set; } 
}