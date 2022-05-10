using FreditorBackend.Models.ArchiveModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.ArchiveRepository
{
    public interface IArchiveRepository
    {
        Task<IEnumerable<ArchiveDto>> DeleteArchive(int archiveId);

        Task<bool> IsArchiveExist(int archiveId);
    }
}
