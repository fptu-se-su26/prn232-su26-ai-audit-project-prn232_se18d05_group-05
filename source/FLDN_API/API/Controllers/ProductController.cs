using Application;
using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[ApiController]
public sealed class ProductController(
    ApplicationDbContext dbContext
) : ControllerBase
{
    [HttpGet("api/products")]
    [HttpGet("api/products/search")]
    public async Task<IActionResult> GetProducts([FromQuery] string? keyword, [FromQuery] Guid? categoryId, [FromQuery] int page = 1, [FromQuery] int pageSize = 50, CancellationToken ct = default)
    {
        // Auto-seed if database has no products yet
        await AppData.SeedAsync(dbContext);

        var query = dbContext.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Include(p => p.ProductImages)
            .Where(p => !p.IsDeleted && p.IsActive);

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            var kw = keyword.Trim().ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(kw) || (p.Description != null && p.Description.ToLower().Contains(kw)));
        }

        if (categoryId.HasValue && categoryId.Value != Guid.Empty)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        var totalCount = await query.CountAsync(ct);
        var products = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new
            {
                productId = p.Id,
                name = p.Name,
                description = p.Description,
                wholesalePrice = p.WholesalePrice,
                retailPrice = p.WholesalePrice * 1.25m,
                unit = p.Unit,
                packagingStandard = p.PackagingStandard,
                categoryId = p.CategoryId,
                categoryName = p.Category != null ? p.Category.Name : "Khác",
                supplierId = p.SupplierId,
                supplierName = p.Supplier != null ? p.Supplier.BusinessName : "Nhà cung cấp",
                mainImage = p.ProductImages.Select(i => i.ImageUrl).FirstOrDefault() ?? "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
                quantity = 100
            })
            .ToListAsync(ct);

        return Ok(ApiResponse<object>.Ok(new
        {
            items = products,
            totalCount,
            page,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        }));
    }

    [HttpGet("api/products/{id:guid}")]
    public async Task<IActionResult> GetProductById(Guid id, CancellationToken ct = default)
    {
        var product = await dbContext.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Include(p => p.ProductImages)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, ct);

        if (product == null)
            return NotFound(ApiResponse<object>.Error("Product not found", StatusCodes.Status404NotFound));

        return Ok(ApiResponse<object>.Ok(new
        {
            productId = product.Id,
            name = product.Name,
            description = product.Description,
            wholesalePrice = product.WholesalePrice,
            retailPrice = product.WholesalePrice * 1.25m,
            unit = product.Unit,
            packagingStandard = product.PackagingStandard,
            categoryId = product.CategoryId,
            categoryName = product.Category?.Name ?? "Khác",
            supplierId = product.SupplierId,
            supplierName = product.Supplier?.BusinessName ?? "Nhà cung cấp",
            mainImage = product.ProductImages.Select(i => i.ImageUrl).FirstOrDefault() ?? "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
            quantity = 100
        }));
    }

    [HttpGet("api/categories")]
    public async Task<IActionResult> GetCategories(CancellationToken ct = default)
    {
        await AppData.SeedAsync(dbContext);

        var categories = await dbContext.Categories
            .AsNoTracking()
            .Select(c => new
            {
                categoryId = c.Id,
                name = c.Name,
                description = c.Description
            })
            .ToListAsync(ct);

        return Ok(ApiResponse<object>.Ok(categories));
    }
}
