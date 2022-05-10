using FreditorBackend.Models.ArchiveModel;
using FreditorBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.ArchiveRepository
{
    public class ArchiveRepository: IArchiveRepository
    {
        private readonly DatabaseContext _context;

        public ArchiveRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> IsArchiveExist(int archiveId)
        {
            if(await _context.FredArchive.AnyAsync(x => x.ArchiveId == archiveId))
            {
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<ArchiveDto>> DeleteArchive(int archiveId)
        {
            var archive = await _context.FredArchive.FindAsync(archiveId);
            if(archiveId != archive.ArchiveId)
            {
                // do nothing
                return null;
            }

            _context.FredArchive.Remove(archive);
            await _context.SaveChangesAsync();

            return await _context.FredArchive.ToListAsync();
        }
    }
}
