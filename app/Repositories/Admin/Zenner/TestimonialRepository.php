<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\Testimonial;

class TestimonialRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new Testimonial());
    }

    protected function getSearchableColumns(): array
    {
        return ['customer_name', 'content', 'product_name'];
    }
}
